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
* @param updatedIssueFields { Object } Updated fields
*/
let updateIssue = ( issueObject, updatedIssueFields ) => {
  return new Promise( ( resolve, reject ) => {
    const options = {
      'new': true,
      'upsert': false,
      'runValidators': true
    }

    Issue.findOneAndUpdate( issueObject, updatedIssueFields, options, ( err, issue ) => {
      if ( err ) {
        reject( err );
      }
      resolve( issue );
    });
  });
}

/**
* Delete an Issue given
* @param issueObject { Issue } Issue to be Deleted
*/
let deleteIssue = issueObject => {
  return new Promise( ( resolve, reject ) => {
    Issue.findOneAndRemove( issueObject, ( err, issue ) => {
      if ( err ) {
        reject( err );
      }
      resolve( issue );
    });
  });
}


module.exports = {
  createIssue,
  readIssues,
  updateIssue,
  deleteIssue
}
