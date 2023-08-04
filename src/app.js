const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./utils/database');
const hendleError = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'glya')));


db.authenticate()
  .then(() => console.log('Authenticate complete'))
  .catch(error => console.log(error));

db.sync({ force: false })
  .then(() => console.log('Synchronized database'))
  .catch(error => console.log(error));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});

app.use(
  express.static('glya', {
    setHeaders: (res, path, stat) => {
      res.set('Content-Type', 'text/css'); // Cambia el tipo MIME según corresponda
    }
  })
);

app.use(hendleError);

module.exports = app;
