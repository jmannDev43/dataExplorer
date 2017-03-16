const mongodb = require('mongodb');
const Promise = require('promise');

const MongoClient = mongodb.MongoClient;

const getResults = (mongoUrl, limit, queries) => {

  // enforce limit of 2 records per collection, so as to not

};

export default getResults;
