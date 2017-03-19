const express = require('express');

const getSchema = require('./getSchema.js');
const schemaFileExists = require('./schemaFileExists.js');
const getResults = require('./getResults.js');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getSchema/:hostname/:port/:database/:username?/:password?', (req, res) => {
  const hostname = req.params.hostname;
  const port = req.params.port;
  const database = req.params.database;
  const username = req.params.username;
  const password = req.params.password;
  getSchema(hostname, port, database, username, password).then((json) => {
    res.send(json);
  }).catch((err) => {
    console.log('err', err);
    res.status(400).send(err.message);
  });
});

app.get('/schemaFileExists', (req, res) => {
  res.send(schemaFileExists());
});

app.get('/getResults/:mongoUrl/:limit/:collection/:field/:value/:valueType', (req, res) => {
  const mongoUrl = req.params.mongoUrl;
  const limit = req.params.limit;
  const collection = req.params.collection;
  const field = req.params.field;
  const value = req.params.value;
  const valueType = req.params.valueType;
  getResults(mongoUrl, limit, collection, field, value, valueType).then((json) => {
    res.send(json);
  }).catch((err) => {
    console.log('err', err);
    res.status(400).send(err.message);
  });
});

module.exports = app;
