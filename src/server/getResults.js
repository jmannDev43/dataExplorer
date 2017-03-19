const mongodb = require('mongodb');
const Promise = require('promise');

const MongoClient = mongodb.MongoClient;

const getResults = (mongoUrl, limit, collection, field, value, valueType) => {
  const newValue = convertValue(value, valueType);

  return new Promise((resolve, reject) => {
    MongoClient.connect(mongoUrl, (err, db) => {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        console.log('Connection established to', mongoUrl);
      }
      const query = {};
      query[field] = newValue;
      const limitInt = parseInt(limit);
      db.collection(collection).find(query).limit(limitInt).toArray((err, results) => {
        console.log('results', results);
        db.close();
        return resolve(JSON.stringify(results));
      });
    });
  });
};

const convertValue = (value, valueType) => {
  if (valueType === 'float') {
    return parseFloat(value);
  } else if (valueType === 'int') {
    return parseInt(value);
  }
  return value;
};

module.exports = getResults;
