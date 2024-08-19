const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  const trip = req.params.id;
  console.log('reqparams is:', req.params);
  let queryText = `SELECT paddlers.id, paddlers.first_name, paddlers.last_name, paddlers.tripid, trips.entry_date, trips.entryid, trips.id FROM paddlers
JOIN trips ON paddlers.tripid = trips.id 
WHERE paddlers.tripid = $1;`;
  pool.query(queryText, [trip])
  .then((result) => {
    console.log('paddlers get', result.rows)
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});


/**
 * GET names route
 */
router.get('/names/:id', (req, res) => {
  const tripId = req.params.id;
  console.log('reqparams id is:', req.params.id);
  let queryText = `SELECT * FROM paddlers 
                  WHERE tripid = $1;`;
  pool.query(queryText, [tripId]).then((result) => {
    console.log('GearList results', result.rows)
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

router.get('/initials/:id', (req, res) => {
  const tripId = req.params.id;
  let queryText = `SELECT
    tripid,
    first_name,
    last_name,
    LEFT(first_name, 1) AS first_name_initial,
    LEFT(last_name, 1) AS last_name_initial
    FROM paddlers WHERE tripid = $1;`;
  pool.query(queryText, [tripId]).then((result) => {
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
  let tripid = paddlers.tripid;

  let queryText = `INSERT INTO paddlers (first_name, last_name, tripid) VALUES ($1, $2, $3);`;

  pool.query(queryText, [firstName, lastName, tripid])
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
