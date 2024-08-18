const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * POST route
 */
router.post('/:id', (req, res) => {
  // POST route code here
  console.log('POST req.body', req.body);
  let meals = req.body;
  let item = meals.item;
  let quantity = meals.quantity;
  let meal = meals.meal;
  let buy = meals.buy;
  let paddler = meals.paddlerid

  let queryText = `INSERT INTO meallist (item, quantity, meal, buy, paddlerid) VALUES ($1, $2, $3, $4, $5);`;

  pool.query(queryText, [item, quantity, meal, buy, paddler])
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
