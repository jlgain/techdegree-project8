/* Dependencies */

// Require dependencies for node.js to run app
const Sequelize = require('sequelize');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Create new web/express application by calling express
// to make "app" central part of our application
const app = express();

/* Middleware */

// Tell express to use static middleware/files
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use set method to set the view engine to the parameter pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Routes */

// Import routes to let app.js access routes
const routes = require('./routes/index');
const books = require('./routes/books');

// Use routes variable to make middleware
app.use('/', routes);
app.use('/books', books);

// Run middleware with annonymous function with app.use method
// which runs everytime a request comes into the app
app.use((req, res, next) =>
{
  // Catch 404 error and forward to error handler
  next(createError(404));
});

// Add middleware error handler and pass it into app.use method with 4 parms
app.use((err, req, res, next) =>
{
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', {title: "SQL Library Manager"});
});

module.exports = app;
