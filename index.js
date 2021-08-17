  
'use strict';

const { db } = require('./src/auth/models');
const server = require('./src/server');

db.sync().then(() => {
  server.start(3000);
});