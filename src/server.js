'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./middleware/500');
const notFound = require('./middleware/404');
const authRoutes = require('./router/routerauth');
const apiRoutes = require('./router/v1');
const apiRoutesV2 = require('./router/v2');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use('/api/v1',apiRoutes);
app.use('/api/v2', apiRoutesV2);

app.get('/', (req, res) => {
  res.send('Home route');
});

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};