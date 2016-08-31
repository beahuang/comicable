'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const inert = require('inert');
const Promise = require('bluebird');

server.connection( { port: 8080 } );



require('./routes/api.js')( server );

function register( plugin ) {
  return new Promise( ( resolve, reject ) => {
    server.register( plugin, err => {
      if ( err ) {
        return reject( err );
      }
      resolve();
    });
  });
}

let plugins = [
  register( inert )
];

Promise.all( plugins ).then( () => {

  // Serves statics
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'dist'
      }
    }
  });

  server.start( err => {
    if ( err ) {
      console.error( err ); // Synchronous write to STDERR
      process.exit( 1 );
    }
    console.log('Server started on port: ', server.info.port );
  });
})
.catch( console.error );

