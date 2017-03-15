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
      } else {
        console.log('Connection established to', url);

        db.listCollections().toArray((err, collections) => {
          const collectionNames = collections.map(c => c.name);
          const lastCollectionName = _.last(collectionNames);
          collectionNames.forEach((name) => {
            console.log(`running collection: ${name.toUpperCase()}`);
            exec(`mongo ${databaseName} --eval "var collection = '${name}', outputFormat='json'" ${__dirname}/variety.js --port ${port} --quiet`, (err, stdout, stderr) => {
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
                    return resolve(JSON.stringify(retVal));
                  }
                  // console.log('dbSchema', JSON.stringify(dbSchema));
                  // return JSON.stringify(dbSchema);
                  //   console.log('dbSchema successfully processed!');
                  //   return dbSchema;
                  // const file = `${process.cwd()}/dbSchema.js`;
                  //
                  // // clear file
                  // exec(`> ${file}`, () => {
                  //   console.log('clear finished');
                  //   jsonfile.writeFile(file, dbSchema, { spaces: 2 }, (err) => {
                  //     console.log('write json finished');
                  //     if (err) {
                  //       console.error(err);
                  //     } else {
                  //       exec(`echo "var collectionFields = " | cat - ${file} > temp && mv temp ${file}`);
                  //     }
                  //   });
                  // });
                  // }

                } catch (e) {
                  console.log('PROBLEM WITH STDOUT', stdout);
                  return false;
                }
              }
            });
          });
        });
      }
    });
  });
};

module.exports = getSchema;
