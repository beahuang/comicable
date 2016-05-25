'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let issueSchema = {
  title: 'String',
  author: 'String',
  imgURL: 'String',
  seriesTitle: 'String',
  issueNumber: 'Number',
  publisher: 'String',
  currentlyReading: 'Boolean',
  favorite: 'Boolean',
  uploaded: 'Boolean',
  dateReleased: 'Date'
}

let Issue = mongoose.model( 'Issue', new mongoose.Schema( issueSchema ) );

/**
* Creates an Issue given an Issue Object
* @param issueObject { Issue } Issue to be Created
*/
let createIssue = issueObject => {
  return Issue.create( issueObject, ( err, issue ) => {
    if ( err ) {
      throw new Error( err );
    }
  });
}

/**
* Get all the Issues
*/
let readIssues = issueObject => {
  return Issue.find( {}, ( err, issues ) => {
    if ( err ) {
      throw new Error( err );
    }
  });
}

/**
* Update an issue
* @param issueObject { Issue } Issue to be updated
*/
let updateIssue = ( issueObject, updatedIssueObject ) => {
  Issue.update( issueObject, { $set: updatedIssueObject }, ( err, issue ) => {
    if ( err ) {
      throw new Error( err );
    }
  });
}

/**
* Delete an Issue given
* @param issueObject { Issue } Issue to be Deleted
*/
let deleteIssue = issueObject => {
  Issue.remove( issueObject , ( err, issue ) => {
    if ( err ) {
      throw new Error( err );
    }
  });
}

module.exports = {
  createIssue,
  readIssues,
  updateIssue,
  deleteIssue
}
