const express = require('express');
const path = require('path');

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
  });
});

app.get('/schemaFileExists', (req, res) => {
  res.send(schemaFileExists());
});

app.get('/getResults/:mongoUrl/:limit/:collection/:field/:value', (req, res) => {
  const mongoUrl = req.params.mongoUrl;
  const limit = req.params.limit;
  const collection = req.params.collection;
  const field = req.params.field;
  const value = req.params.value;
  getResults(mongoUrl, limit, collection, field, value).then((json) => {
    res.send(json);
  });
});

module.exports = app;
