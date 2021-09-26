const express = require('express');

const app = express();

const mainPages = require('./routes/mainPages');
const categories = require('./routes/categories');

app.use('/', mainPages);
app.use('/categories', categories);

app.listen(4000, () => {
  console.log('Server works');
});
