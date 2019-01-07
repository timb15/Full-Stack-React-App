'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json;
const cors = require('cors');

//setup mongoose and connect to database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fsjstd-restapi');

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Connection error:', err);
});

db.once('open', () => {
    console.log('Databse connection successful!');
});

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

//set up CORS for all requests
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

//setup body-parser
app.use(jsonParser());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//setup api routes
const routes = require('./routes');
app.use('/api', routes);


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});



// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
