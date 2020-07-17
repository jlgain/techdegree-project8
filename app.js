/* Dependencies */

// Require dependencies for node.js to run app
const Sequelize = require('sequelize');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import route definitions to let app.js access routes
const routes = require('./routes/index');
const books = require('./routes/books');

// Instantiate Express app
const app = express();

/* Middleware */

// Use set method to set the view engine to the parameter pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express middleware for accessing the req.body
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */

// Use route definition variables for middleware
app.use('/', routes);
app.use('/books', books);

/* Error Handlers */

// 404 handler to catch undefined or non-existent route requests
// that are not caught by any other route handlers
app.use((req, res, next) =>
{
  // Catch 404 error and forward to error handler
  // const err = new Error('Page Not Found');
  // res.status(404);
  // next(err);
  res.status(404).render('page-not-found');
});

// Global middleware error handler that deal with 
// any errors the route handlers encounter
app.use((err, req, res, next) =>
{
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page back to client with error data
  if (err.status === 404)
  {
    res.status(404);
    res.render('page-not-found', {title: "Page Not Found"});
  }
  else
  {
    res.status(err.status || 500);
    err.message = err.message || `Oops! It looks like something went wrong on the server.`;
    res.render('error', {title: "Server Error"});
  }
});

module.exports = app;
