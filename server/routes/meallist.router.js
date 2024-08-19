const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/:id', (req, res) => {
  const tripId = req.params.id;
  console.log('reqparams is:', req.params);
  let queryText = `SELECT meallist.id, item, meal, quantity, buy, paddlerid, tripid, first_name, last_name FROM meallist
JOIN paddlers ON meallist.paddlerid = paddlers.id WHERE paddlers.tripid = $1;`;
  pool.query(queryText, [tripId])
  .then((result) => {
    console.log('MealList results', result.rows)
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * POST route
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('POST req.body', req.body);
  let meals = req.body;
  let item = meals.item;
  let quantity = meals.quantity;
  let meal = meals.meal;
  let buy = meals.buy;
  let paddlerid = meals.paddlerid

  let queryText = `INSERT INTO meallist (item, quantity, meal, buy, paddlerid) VALUES ($1, $2, $3, $4, $5);`;

  pool.query(queryText, [item, quantity, meal, buy, paddlerid])
    .then(dbResult => {
      console.log('dbResult.rows', dbResult.rows);
      res.sendStatus(201);
    })
    .catch(dbError => {
      console.log('dberror', dbError);
      res.sendStatus(500);
    })
});

/**
 * PUT route
 */
router.put('/buy/:mealid', (req, res) => {
  console.log(req.params);
  console.log(req.body);
  let id= req.params.mealid;

  const queryText = `UPDATE "meallist" SET "buy" = NOT "buy" WHERE "id" = $1;`;


  pool.query(queryText, [id])
      .then(dbResult => {
          console.log(`Got stuff back from the database`, dbResult);
          res.sendStatus(201);

      })
      .catch(dbError => {
          console.log(`Error making database query ${queryText}`, dbError);
          res.sendStatus(500);
      })
});

/**
 * DELETE route
 */
router.delete('/:deleteid', (req, res) => {

  console.log('req.params', req.params);
  let id = req.params.deleteid

  let queryText = `DELETE FROM "meallist" WHERE id = $1;`;

  // send it to the database
  pool.query(queryText, [id])
      .then(dbResult => {
          // unpack the results
          console.log('Database results', dbResult);
          // send the client a response, based on the results.
          res.sendStatus(200);
      })
      .catch(dbError => {
          // do error things
          console.log(dbError);
          // send the client a response, based on the results.
          res.sendStatus(500);
      })
});


module.exports = router;
