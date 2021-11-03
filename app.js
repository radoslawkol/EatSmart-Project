const express = require('express');
const path = require('path');

const recipeRouter = require('./routes/recipeRoutes');

const app = express();

app.use(express.json());

let initialPath = path.join(__dirname, '');

app.use(express.static(initialPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'homePage.html'));
});

app.get('/recipes', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'recipesPage.html'));
});

app.get('/recipes/:id', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'dishPage.html'));
});

app.use('/api/v1/recipes', recipeRouter);

module.exports = app;
