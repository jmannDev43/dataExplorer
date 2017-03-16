const fs = require('fs');
const jsonfile = require('jsonfile');

const schemaFileExists = () => {
  const file = `${process.cwd()}/dbSchema.js`;
  const fileExists = fs.existsSync(file);

  if (fileExists) {
    return jsonfile.readFileSync(file);
  }
  return false;
};

module.exports = schemaFileExists;
