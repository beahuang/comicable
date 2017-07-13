'use strict';

let issue = require('../resources/issue.js');

module.exports = server => {

  server.route({
    method: 'POST',
    path: '/issues',
    handler: ( request, reply ) => {
      issue.createIssue( request.payload )
      .then( issue => {
        reply( issue );
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/issues',
    handler: ( request, reply ) => {
      issue.readIssues()
      .then( ( issues ) => {
        reply( issues );
      });
    }
  });
};
