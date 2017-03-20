const _ = require('underscore');
const jsonfile = require('jsonfile');
const exec = require('child_process').exec;
const mongodb = require('mongodb');
const Promise = require('promise');

const MongoClient = mongodb.MongoClient;

const getSchema = (hostname, port, databaseName, userName, password) => {
  let url;
  if (userName && password) {
    url = `mongodb://${userName}:${password}@${hostname}:${port}/${databaseName}`;
  } else {
    url = `mongodb://${hostname}:${port}/${databaseName}`;
  }

  return new Promise((resolve, reject) => {
    const dbSchema = {};
    MongoClient.connect(url, (err, db) => {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        return resolve({ error: 'Invalid connection info.  Please re-configure connection details and try again.' });
      }
      console.log('Connection established to', url);

      db.listCollections().toArray((err, collections) => {
        if (!collections.length) {
          db.close();
          return reject(new Error('Invalid connection info.  Please re-configure connection details and try again.'));
        }
        const collectionNames = collections.map(c => c.name).sort();
        const lastCollectionName = _.last(collectionNames);

        collectionNames.forEach((name) => {
          console.log(`running collection: ${name.toUpperCase()}`);
          exec(`mongo ${databaseName} --eval "var collection = '${name}', outputFormat='json', limit = 1, maxDepth = 3" ${__dirname}/variety.js --port ${port} --quiet`, (err, stdout, stderr) => {
            let json = [];
            if (stdout) {
              try {
                json = JSON.parse(stdout);
                const collectionFields = json.map(j => j._id.key );
                const collectionSchema = _.map(json, (j) => {
                  const types = _.map(j.value.types, (type, key) => `${key} (${type})`).join(', ');
                  return { field: j._id.key, types };
                });
                const collectionInfo = { collectionSchema, collectionFields };
                dbSchema[name] = collectionInfo;

                if (name === lastCollectionName) {
                  const retVal = { dbSchema };
                  db.close();
                  const file = `${process.cwd()}/dbSchema.js`;

                  // clear file
                  exec(`> ${file}`, () => {
                    console.log('clear finished');
                    jsonfile.writeFile(file, dbSchema, { spaces: 2 }, (err) => {
                      console.log('write json finished');
                      if (err) {
                        console.error(err);
                      }
                    });
                  });

                  return resolve(JSON.stringify(retVal));
                }
              } catch (e) {
                console.log('PROBLEM WITH STDOUT', stdout);
                return false;
              }
            }
          });
        });
      });
    });
  });
};

module.exports = getSchema;
