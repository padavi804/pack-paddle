const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM entrypoints';
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log('POST req.body', req.body);
  let newTrip = req.body;
  let userid = newTrip.userid;
  let entryid = newTrip.entryid;
  let entry_date = newTrip.entry_date;

  let queryText = `INSERT INTO trips (userid, entryid, entry_date) VALUES ($1, $2, $3) RETURNING id;`;

  pool.query(queryText, [userid, entryid, entry_date])
    .then(dbResult => {
      console.log('dbResult.rows Post Successful', dbResult.rows);
      // const tripid = dbResult.rows[0];
      // res.send(tripid);
      res.sendStatus(201);
    })
    .catch(dbError => {
      console.log('dberror', dbError);
      res.sendStatus(500);
    })
});

module.exports = router;
