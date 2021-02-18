const { Router } = require('express');
const fs = require("fs");

const regions = fs.readFileSync("./departements-france.csv", "utf-8").split("\n").map(line => parseInt(line.split(",")[2])).filter(r => !isNaN(r));

const router = new Router();

router.get('/', (req, res) => {
    res.status(200).json(regions[parseInt(req.query["dep"])]);
});

module.exports = router;