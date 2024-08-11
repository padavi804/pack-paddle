const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM gearlist';
  pool.query(queryText).then((result) => {
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

  console.log('POST req.body', req.body);
  let gear = req.body;
  let item = gear.item;
  let quantity = gear.quantity;
  let buy = gear.buy;
  let paddler = gear.paddlerid;

  let queryText = `INSERT INTO gearlist (item, quantity, buy, paddler) VALUES ($1, $2, $3, $4);`;

  pool.query(queryText, [item, quantity, buy, paddler])
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
router.put('/toggle/:id', (req, res) => {
  console.log(req.params);
  console.log(req.body);
  let { id } = req.params;

  const queryText = `UPDATE "gearlist" SET "buy" = NOT "false" WHERE "id" = $1;`;


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
router.delete('/:id', (req, res) => {

  console.log('req.params', req.params);
  let idToDelete = req.params.id

  console.log('typeof idToDelete', typeof idToDelete);

  let queryText = `DELETE FROM "gearlist" WHERE id = $1;`;

  // send it to the database
  pool.query(queryText, [idToDelete])
      .then(dbResult => {
          // unpack the results
          console.log(dbResult);
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
