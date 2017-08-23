'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');
const dbURL = require('../config.js')('mongoURL');

mongoose.Promise = Promise;
let db = mongoose.connection;

// All of these eventListeners are probably overkill and one day
// There will be something better in them
db
.on( 'connected', () => {} )
.on( 'error', err => {} )
.on( 'close', () => {} )
.on( 'disconnected', () => {} );

module.exports = mongoose.connect( dbURL , { useMongoClient: true } );
