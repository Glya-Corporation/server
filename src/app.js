const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./utils/database');
const handleError = require('./middlewares/error.middleware'); // Corrige el nombre del middleware

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Servir archivos estáticos desde la carpeta 'glya'
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

// Middleware para manejar errores
app.use(handleError);

module.exports = app;
