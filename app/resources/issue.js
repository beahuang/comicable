'use strict';

let Issue = require('../models/issue.js');
let Promise = require('bluebird');

/**
* Creates an Issue given an Issue Object
* @param issueObject { Issue } Issue to be Created
*/
let createIssue = issueObject => {
  return new Promise( ( resolve, reject ) => {
    Issue.create( issueObject, ( err, issue ) => {
      if ( err ) {
        reject( err );
      }
      resolve( issue );
    });
  });
}

/**
* Get all the Issues
*/
let readIssues = issueObject => {
  return new Promise( ( resolve, reject ) => {
    Issue.find( {} , ( err, issues ) => {
      if ( err ) {
        reject( err );
      }

      resolve( issues );
    });
  });
}

/**
* Update an issue
* @param issueObject { Issue } Issue to be updated
*/
let updateIssue = ( issueObject, updatedIssueObject ) => {
  return Issue.update( issueObject, { $set: updatedIssueObject }, ( err, issue ) => {
    if ( err ) {
      throw new Error( err );
    }

    return issue;
  });
}

/**
* Delete an Issue given
* @param issueObject { Issue } Issue to be Deleted
*/
let deleteIssue = issueObject => {
  return Issue.remove( issueObject , ( err, issue ) => {
    if ( err ) {
      throw new Error( err );
    }

    return issue;
  });
}


module.exports = {
  createIssue,
  readIssues,
  updateIssue,
  deleteIssue
}
