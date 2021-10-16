const express = require('express');
const path = require('path');

const app = express();

let initialPath = path.join(__dirname, '');

app.use(express.static(initialPath));

const mainPages = require('./routes/mainPages');
const categories = require('./routes/categories');
const exp = require('constants');

// app.use('/', mainPages);
// app.use('/categories', categories);

app.get('/', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'homePage.html'));
});

module.exports = app;
