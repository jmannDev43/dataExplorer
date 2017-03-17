const mongodb = require('mongodb');
const Promise = require('promise');

const MongoClient = mongodb.MongoClient;

const getResults = (mongoUrl, limit, collection, field, value) => {
  // console.log('mongoUrl', mongoUrl);
  // console.log('limit', limit);
  // console.log('collection', collection);
  // console.log('field', field);
  // console.log('value', value);

  const newValue = isNaN(parseInt(value)) ? value : parseInt(value);

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
        db.close();
        return resolve(JSON.stringify(results));
      });
    });
  });
};

module.exports = getResults;
