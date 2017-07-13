'use strict';

const mongoose = require('mongoose');
const dbURL = require('../config.js')('mongoURL');

let db = mongoose.connection;

// All of these eventListeners are probably overkill and one day
// There will be something better in them
db.on( 'connected', () => {
  console.log('Database connected at: ', dbURL );
})
.on( 'error', err => {
  console.log( 'Database error', err );
})
.on( 'close', () => {
  console.log('Database connection closed');
})
.on( 'disconnected', () => {
  console.log('Database disconnected');
});



module.exports = mongoose.connect( dbURL );
