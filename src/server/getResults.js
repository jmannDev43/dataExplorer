const mongodb = require('mongodb');
const Promise = require('promise');

const MongoClient = mongodb.MongoClient;

const convertValue = (value, valueType) => {
  if (valueType === 'float') {
    return parseFloat(value);
  } else if (valueType === 'int') {
    return parseInt(value);
  }
  return value;
};

const getResults = (mongoUrl, limit, collection, field, value, valueType) => {
  let newValue;
  const query = {};
  if (value.indexOf(',') > -1) {
    newValue = value.split(',').map(val => convertValue(val, valueType));
    query[field] = { $in: newValue };
  } else {
    newValue = convertValue(value, valueType);
    query[field] = newValue;
  }

  return new Promise((resolve, reject) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', mongoUrl);
      }
      const limitInt = parseInt(limit);
      db.collection(collection).find(query).limit(limitInt).toArray((err, results) => {
        console.log('results', results);
        db.close();
        return resolve(JSON.stringify(results));
      });
    });
  });
};

module.exports = getResults;
