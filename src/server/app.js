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

app.get('/getResults', (req, res) => {
  res.send(getResults());
});

module.exports = app;
