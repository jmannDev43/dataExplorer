const fileExists = require('file-exists');
const fs = require('fs');

const schemaFileExists = () => {
  return fs.existsSync(`${process.cwd()}/dbSchema.js`);
};


module.exports = schemaFileExists;
