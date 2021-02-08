const { Router } = require('express');
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
const RestOperator = require('../utils/rest-operator')
const filtering = require("./filtering")

/**
 * Connexion to mongoDB : 
 * dont forget to create a mongodb.config at the root project and write in it the url
 */
const url = fs.readFileSync("./mongodb.config", "utf-8")
const dbName = 'covidDB';
let db
 
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  console.log("Connected to mongoDB server");
  db = client.db(dbName);
});

/**
 * Router setup
 */

const router = new Router();
const paths = ['/heb/dep', '/heb/fra', '/heb/reg', '/quot/dep', '/quot/fra', '/quot/reg']
router.get('/', (req, res) => {
    res.status(200).json([]);
});

paths.forEach(path => {
    router.get(path, (req, res) => {
        db.collection(path.replace("/", "").replace("/", "-")).find(filtering(req.query)).toArray()
            .then(docs => res.status(200).json(docs))
            .catch(err => res.status(500).json(err));
    });
});

/*

Bon tuto => https://practicalprogramming.fr/api-node-js-mongodb/

router.post('/', (req, res) => {
    try {
        const list = rest_operator.post(req.body);
        res.status(201).json(list);
    } catch (e) {
        res.status(500).json(e);
    }
});
router.put('/:listId', (req, res) => {
    try {
        const list = rest_operator.update(req.params.listId, req.body);
        res.status(200).json(list);
    } catch (e) {
        if(e.name === 'ItemNotFoundError') {
            res.status(404).end();
        } else {
            res.status(500).json(e);
        }
    }
});
router.delete('/:listId', (req, res) => {
    try {
        const list = rest_operator.delete(req.params.listId);
        res.status(204).end();
    } catch (e) {
        if(e.name === 'ItemNotFoundError') {
            res.status(404).end();
        } else {
            res.status(500).json(e);
        }
    }
});
*/
module.exports = router;