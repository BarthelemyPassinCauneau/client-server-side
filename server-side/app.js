const bodyParser = require('body-parser');
var express = require('express');
var path = require('path');


var covidRouter = require('./covid_data');
const cors = require('cors');

var app = express();

// view engine setup
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/covid_data', covidRouter);

const port = 8080;
const hostname = 'localhost';

const server = app.listen(port, hostname, () => {
  console.log(`Server is listening on http://${hostname}:${port}`)
})

app.get('/', (req, res) => {
  res.status(200).json({status: 'Server is up'})
})

module.exports = app;
