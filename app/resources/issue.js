'use strict';

let Issue = require('../models/issue.js');

/**
* Creates an Issue given an Issue Object
* @param issueObject { Issue } Issue to be Created
*/
let createIssue = issueObject => {
  return Issue.create( issueObject, ( err, issue ) => {
    if ( err ) {
      throw new Error( err );
    }

    return issue;
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

    return issues;
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

createIssue({
          issueTitle: 'Agents of S.H.I.E.L.D. (2016-) #5 Aso',
          imgURL: 'https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/PrintItem/501600/MAR160802._SX200_QL80_TTD_.jpg',
          seriesTitle: 'Agents of S.H.I.E.L.D. (2016-)',
          issueNumber: 5
        });


module.exports = {
  createIssue,
  readIssues,
  updateIssue,
  deleteIssue
}
