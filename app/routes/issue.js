'use strict';

let issue = require('../models/issue.js');

module.exports = server => {

  server.route({
    method: 'GET',
    path: '/issues',
    handler: issue.readIssues.bind( this );
  });
};
