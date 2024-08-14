const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('reqparams', req.params)
  let queryText = 'SELECT userid, entry_date, entry_point FROM trips JOIN entrypoints ON trips.entryid = entrypoints.id;';
  pool.query(queryText).then((result) => {
    console.log('Trips results', result.rows)
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

router.get('/dashboard/:id', (req, res) => {
  let queryText = 'SELECT userid, entry_date, entry_point FROM trips JOIN entrypoints ON trips.entryid = entrypoints.id; WHERE trips.entryid = $1';
  pool.query(queryText).then((result) => {
    console.log('Trips results', result.rows)
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
