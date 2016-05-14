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
