const express = require('express');
const path = require('path');

const AppError = require('./utlis/appError');
const recipeRouter = require('./routes/recipeRoutes');
const articlesRouter = require('./routes/articlesRoutes');

const app = express();

app.use(express.json());

let initialPath = path.join(__dirname, '');

app.use(express.static(initialPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'homePage.html'));
});

app.get('/przepisy', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'recipesPage.html'));
});

app.get('/przepisy/:id', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'dishPage.html'));
});

app.get('/o-nas', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'about.html'));
});

app.get('/kalkulator-BMI', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'calculatorBMI.html'));
});

app.get('/kalkulator-BMR', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'calculatorBMR.html'));
});

app.get('/artykuly', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'articlesPage.html'));
});

app.get('/artykuly/:id', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'articlePage.html'));
});

app.get('/cookies', (req, res) => {
  res.sendFile(path.join(initialPath, 'public', 'templates', 'policy.html'));
});

app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/articles', articlesRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      erorr: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === 'production') {
    // Send message to the client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      // Programming or other unkown error
    } else {
      console.error('ERROR', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
      });
    }
  }
});

module.exports = app;
