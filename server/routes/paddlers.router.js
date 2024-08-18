const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM paddlers
JOIN trips ON paddlers.tripid = trips.id
;`;
  pool.query(queryText)
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
// router.get('/initials', (req, res) => {
//   let queryText = 'SELECT * FROM paddlers ';
//   pool.query(queryText).then((result) => {
//     res.send(result.rows);
//   }).catch((error) => {
//     console.log(error);
//     res.sendStatus(500);
//   });
// });

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
