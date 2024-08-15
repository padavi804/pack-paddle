const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM paddlers
JOIN trips on paddlers.tripid = trips.id
WHERE trips.id = $1;`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

router.get('/initials', (req, res) => {
  let queryText = 'SELECT * FROM paddlers ';
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
  // POST route code here
  console.log('POST req.body', req.body);
  let paddlers = req.body;
  let firstName = paddlers.first_name;
  let lastName = paddlers.last_name;

  let queryText = `INSERT INTO paddlers (first_name, last_name) VALUES ($1, $2);`;

  pool.query(queryText, [firstName, lastName])
    .then(dbResult => {
      console.log('dbResult.rows', dbResult.rows);
      res.sendStatus(201);
    })
    .catch(dbError => {
      console.log('dberror', dbError);
      res.sendStatus(500);
    })
});

module.exports = router;
