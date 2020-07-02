const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM item`;
    pool.query(queryText)
        .then((result) => {
            res.status(200).send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});


/**
 * Add an item for the logged-in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated() === false) {
    res.sendStatus(403);
    return;
  }
  const item = req.body; 
  const user = req.user; // user authenticated
  console.log(user);
  console.log(item);
  
  const queryText = `INSERT INTO item (description, image_url, user_id) VALUES ($1, $2, $3)`;
  const queryThing = [item.description, item.imageURL, user.id];
  console.log(queryThing);
  
  pool
    .query(queryText, queryThing)
    .then(() => {
      console.log('query worked to DB');
      res.sendStatus(201)
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});



/* Delete an item if it's something the logged in user added */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM item WHERE id=$1`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            if (result.rows.length === 0) {
                res.sendStatus(401);
                return;
            }
            const item = result.rows[0];
            if (item.user_id !== req.user.id) {
                res.sendStatus(418).send('You cant remove someone elses item.');
                return;
            }
            else {
                // its their item! allow them delete it
                const queryText2 = `DELETE FROM item WHERE id=$1`;
                pool.query(queryText2, [item.id])
                    .then(() => res.sendStatus(200))
                    .catch((error) => {
                        console.log(error);
                        res.sendStatus(500);
                     });
            }     
        });
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;