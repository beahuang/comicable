'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection( { port: 8081 } );

require('./api.js')( server );

server.start( err => {

    if ( err ) {
        throw err;
    }
    console.log( 'Server running at:', server.info.uri );
});

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/comicable';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});
