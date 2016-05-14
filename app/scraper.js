'use strict'

const request = require('request');
const Promise = require('bluebird');

let scrape = () => {

  return new Promise( ( resolve, reject ) => {
    let url = 'https://pulllist.comixology.com/thisweek/';

    request( url, ( err, res, body ) => {
      if ( err ) {
        reject(`There was an error in the GET request: ${ err.message }`);
      };

      resolve( body );
    } );

  })
  .then( data => {
    console.log( data );
  })
  .catch( err => {
    console.log( err );
  });
}

scrape();
