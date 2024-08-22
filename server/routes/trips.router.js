const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
// router.get('/', (req, res) => {
  
//   let queryText = 'SELECT id, userid, entry_date, entry_point FROM trips JOIN entrypoints ON trips.entryid = entrypoints.id;';
//   pool.query(queryText).then((result) => {
//     console.log('Trips results', result.rows)
//     res.send(result.rows);
//   }).catch((error) => {
//     console.log(error);
//     res.sendStatus(500);
//   });
// });

router.get('/:id', (req, res) => {
  const userid = req.params.id
  console.log('reqparams id:', req.params.id);
  let queryText = `SELECT entry_date, entry_point, trips.id, userid FROM trips
                  JOIN entrypoints ON trips.entryid = entrypoints.id                                   
                  WHERE userid = $1;`;
  pool.query(queryText, [userid])
  .then((result) => {
    console.log('Trips results', result.rows)
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

//   `SELECT userid, entry_date, entry_point, longitude, latitude, tripid FROM trips 
// JOIN entrypoints ON trips.entryid = entrypoints.id
// JOIN paddlers ON paddlers.tripid = trips.id;`;


router.get('/detail/:id', (req, res) => {
  const tripId = req.params.id;
  console.log('reqparams id is:', req.params.id);
  const queryText = `
  SELECT 
    trips.userid, 
    trips.entry_date, 
    entrypoints.entry_point, 
    entrypoints.longitude, 
    entrypoints.latitude, 
    trips.id AS tripid
  FROM trips
  JOIN entrypoints ON trips.entryid = entrypoints.id

  WHERE trips.id = $1;
`;
  pool.query(queryText, [tripId])
  .then((result) => {
    console.log('Detail trip results', result.rows)
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
});

module.exports = router;
