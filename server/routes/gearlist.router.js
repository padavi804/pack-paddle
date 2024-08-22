const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/:id', (req, res) => {
  const tripId = req.params.id;
  console.log('reqparams id is:', req.params.id);
  let queryText = `SELECT gearlist.id, item, quantity, buy, paddlerid, tripid, first_name, last_name FROM gearlist 
                  JOIN paddlers ON paddlers.id = gearlist.paddlerid WHERE paddlers.tripid = $1;`;
  pool.query(queryText, [tripId])
  .then((result) => {
    console.log('GearList results', result.rows)
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


/**
 * POST route
 */
router.post('/', (req, res) => {

  console.log('POST req.body', req.body);
  let gear = req.body;
  let item = gear.item;
  let quantity = gear.quantity;
  let buy = gear.buy;
  let paddlerid = gear.paddlerid;

  let queryText = `INSERT INTO gearlist (item, quantity, buy, paddlerid) VALUES ($1, $2, $3, $4);`;

  pool.query(queryText, [item, quantity, buy, paddlerid])
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
router.put('/buy/:gearid', (req, res) => {
  console.log('req params',req.params);
  console.log('req body',req.body);
  let id= req.params.gearid;

  const queryText = `UPDATE gearlist SET buy = NOT buy WHERE id = $1;`;


  pool.query(queryText, [id])
      .then(dbResult => {
          console.log(`Got stuff back from the database`, dbResult);
          res.sendStatus(200);

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


  let queryText = `DELETE FROM "gearlist" WHERE id = $1;`;

  // send it to the database
  pool.query(queryText, [id])
      .then(dbResult => {
          // unpack the results
          console.log(dbResult);
          // send the client a response, based on the results.
          res.sendStatus(201);
      })
      .catch(dbError => {
          // do error things
          console.log(dbError);
          // send the client a response, based on the results.
          res.sendStatus(500);
      })
});

module.exports = router;
