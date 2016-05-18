'use strict';

const mongoose = require('mongoose');

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

let Issue = new mongoose.model( 'Issue', new mongoose.Schema( issueSchema ) );

/**
* Creates an Issue given an Issue Object
* @param issueObject { Issue } Issue to be Created
*/
let createIssue = issueObject => {
  Issue.create( issueObject, ( err, issue ) => {
    if ( err ) return handleError( err );
  });
}

/**
* Get all the Issues
*/
let readIssue = issueObject => {
  Issue.find( {}, ( err, issues ) => {
    if ( err ) return handleError( err );
  });
}

/**
* Update an issue
* @param issueObject { Issue } Issue to be updated
*/
let updateIssue = ( issueObject, updatedIssueObject )=> {
  Issue.update( issueObject, { $set: updatedIssueObject }, ( err, issue ) => {
    if ( err ) return handleError( err );
  });
}

/**
* Delete an Issue given
* @param issueObject { Issue } Issue to be Deleted
*/
let deleteIssue = issueObject => {
  Issue.remove( issueObject , ( err ) => {
    if ( err ) return handleError( err );
  });
}
