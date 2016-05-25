'use strict';

const modulePath = '../../app/models/issue.js';
const assert = require('chai').assert;
const Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/test';

describe ( 'Issue', () =>  {


  describe( '#createIssue', () => {

    // beforeEach( () => {
    //   MongoClient.connect( url, ( err, db ) => {
    //     db.dropDatabase();
    //     db.close();
    //   });
    // });

    it ( 'Throws an error if the Issue creation fails', ( done ) => {
      let issue = require('rewire')( modulePath );
      let mockIssue = {
        title: 2
      }

      issue.createIssue( mockIssue ).then( i => {
        console.log(i)
        done();
      });

      // issue.createIssue( mockIssue )
      // .then( issue => {
      //   console.log(issue)
      //   assert.ok( false );
      //   done();
      // })
      // .catch( err => {
      //   console.log(err)
      //   assert.ok( false );
      //   done();
      // });

    });

    xit ( 'Resolves to an Issue if Issue is successfully created in db', () => {
      let mockIssue = {
        title: 'DC Universe Rebirth #1',
        author: 'Geoff Johns',
        imgURL: 'https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/PrintItem/510822/APR160273._SX200_QL80_TTD_.jpg',
        seriesTitle: 'DC Universe Rebirth',
        issueNumber: 1,
        publisher: 'DC',
        currentlyReading: true,
        favorite: false,
        uploaded: false,
        dateReleased: '05/11/16'
      }

      issue.createIssue( mockIssue )
      .then( issue => {
        assert.sameDeepMembers( issue, mockIssue );
        done();
      });

    });
  });

  xdescribe( '#readIssues', () => {

    beforeEach( () => {
      MongoClient.connect( url, ( err, db ) => {
        db.dropDatabase();
        db.close();
      });
    });

    it ( 'Reads all the Issues in the database', () => {
      let mockIssues = [{
        title: 'DC Universe Rebirth #1',
        author: 'Geoff Johns',
        imgURL: 'https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/PrintItem/510822/APR160273._SX200_QL80_TTD_.jpg',
        seriesTitle: 'DC Universe Rebirth',
        issueNumber: 1,
        publisher: 'DC',
        currentlyReading: true,
        favorite: false,
        uploaded: false,
        dateReleased: '05/11/16'
      }, {
        title: 'Black Panther (2016-) #2',
        author: 'Coates, Ta-Nehisi',
        imgURL: 'https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/PrintItem/502435/MAR160829._SX360_QL80_TTD_.jpg',
        seriesTitle: 'Black Panther (2016-)',
        issueNumber: '2',
        publisher: 'Marvel',
        currentlyReading: false,
        favorite: false,
        uploaded: false,
        dateReleased: '05/11/16'
      }];

      issue.createIssue( mockIssues[0] );
      issue.createIssue( mockIssues[1] );

      issue.readIssues()
      .then( issues => {
        assert.isArray( issues );
        assert.sameDeepMembers( issues, mockIssues );
        done();
      });
    });

  });

  xdescribe( '#updateIssue', () => {

    beforeEach( () => {
      MongoClient.connect( url, ( err, db ) => {
        db.dropDatabase();
        db.close();
      });
    });

    it ( 'Throws an error if it is being updated with invalid properties', () => {
      let mockIssue = {
        title: 'DC Universe Rebirth #1',
        author: 'Geoff Johns',
        imgURL: 'https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/PrintItem/510822/APR160273._SX200_QL80_TTD_.jpg',
        seriesTitle: 'DC Universe Rebirth',
        issueNumber: 1,
        publisher: 'DC',
        currentlyReading: true,
        favorite: false,
        uploaded: false,
        dateReleased: '05/11/16'
      }
      let mockUpdatedIssue = {
        title: 4,
        author: 1,
      }

      issue.updateIssue( mockIssue, mockUpdatedIssue )
      .then( () => {
        assert.ok( false );
        done();
      })
      .catch( err => {
        assert.ok( true );
        done();
      });
    });

    it ( 'Updates the Issue in the database', () => {
      let mockIssue = {
        title: 'DC Universe Rebirth #1',
        author: 'Geoff Johns',
        imgURL: 'https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/PrintItem/510822/APR160273._SX200_QL80_TTD_.jpg',
        seriesTitle: 'DC Universe Rebirth',
        issueNumber: 1,
        publisher: 'DC',
        currentlyReading: true,
        favorite: false,
        uploaded: false,
        dateReleased: '05/11/16'
      }
      let mockUpdatedIssue = {
        title: 'DC Universe Rebirth #5',
        author: 'Johns Johns',
        issueNumber: 4
      }

      issue.updateIssue( mockIssue, mockUpdatedIssue )
      .then( issue  => {
        assert.sameDeepMembers( issue, mockUpdatedIssue );
      })
    });

  });

  xdescribe( '#deleteIssue', () => {

    beforeEach( () => {
      MongoClient.connect( url, ( err, db ) => {
        db.dropDatabase();
        db.close();
      });
    });

    it ( 'Throws an error if Issue to be deleted is not there', () => {
    });

    it ( 'Deletes the Issue from the database', () => {
    });
  });

});
