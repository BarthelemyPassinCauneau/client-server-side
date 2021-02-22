const { Router } = require('express');
const fs = require("fs");

const regions = JSON.parse(fs.readFileSync("./region2020.csv", "utf-8"));

const router = new Router();

router.get('/', (req, res) => {
    res.status(200).json(regions[req.query["reg"]]);
});

module.exports = router;