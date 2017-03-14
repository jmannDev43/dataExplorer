// import app from './app.js';
const app = require('./app.js');

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});