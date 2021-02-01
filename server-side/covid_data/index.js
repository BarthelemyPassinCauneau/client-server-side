const {Router} = require('express');
const RestOperator = require('../utils/rest-operator')

//Configuration du RestOperator
const rest_operator = new RestOperator('covid_data', 'covid_data/covid_data.json');

const router = new Router();
router.get('/', (req, res) => {
    res.status(200).json(rest_operator.get());
});
router.get('/:listId', (req, res) => {
    try {
        const list = rest_operator.getById(req.params.listId);
        res.status(200).json(list);
    } catch (e) {
        if(e.name === 'ItemNotFoundError') {
            res.status(404).end();
        } else {
            res.status(500).json(e);
        }
    }
});
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
module.exports = router;