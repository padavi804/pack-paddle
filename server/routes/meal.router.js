const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM meallist';
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
  let meals = req.body;
  let item = meals.item;
  let quantity = meals.quantity;
  let meal = meals.meal;

  let queryText = `INSERT INTO meallist (item, quantity, meal) VALUES ($1, $2, $3);`;

  pool.query(queryText, [item, quantity, meal])
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
