'use strict';

const mongoose = require('mongoose');
const modulePath = '../../app/resources/issue.js';
const assert = require('chai').assert;
let Issue = require( modulePath );
let db = require('../../app/db/db.js');

describe ( 'Issue', () =>  {

  describe( '#createIssue', () => {

    beforeEach( () => {
      mongoose.connection.collections['issues'].drop( ( err ) => {
        if ( err ) {
          console.log( err );
        }
      });
    });

    it ( 'Resolves to an Issue if Issue is successfully created in db', ( done ) => {
      let db = require('../../app/db/db.js');

      let mockIssue = {
        title: 2
      }

      Issue.createIssue( mockIssue )
      .then( issue => {
        assert.isDefined( issue._id );
        Object.keys( mockIssue ).forEach( key => {
          assert.equal( mockIssue[ key ], issue[ key ] );
        });
        done();
      })
      .catch( err => {
        assert.ok( false );
        done();
      });

    });

    it ( 'Error case', () => {
      let mockIssue = {
        title: 2,
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

      Issue.createIssue( mockIssue )
      .then( () => {
        assert.sameDeepMembers( issue, mockIssue );
        done();
      } )
      .catch( err => {
        assert.ok( true );
      });

    });
  });

  describe( '#readIssues', () => {

    beforeEach( () => {
      mongoose.connection.collections['issues'].drop( ( err ) => {
        if ( err ) {
          console.log( err );
        }
      });
    });

    it ( 'Reads all the Issues in the database', ( done ) => {
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

      Issue.createIssue( mockIssues[ 0 ] )
      .then( () => {
        Issue.createIssue( mockIssues[ 1 ] );
      })
      .then( () => {
        return Issue.readIssues()
      })
      .then( issues => {
        assert.isArray( issues );

        mockIssues.forEach( ( mockIssue, index ) => {
          const actual_issue = issues[ index ];
          Object.keys( mockIssue ).forEach( key => {
            assert.equal( mockIssue[ key ], actual_issue[ key ] );
          });
        });

        done();
      })
      .catch( err => {
        assert.ok( false );
        done();
      });

    });

  });

  describe( '#updateIssue', () => {
    beforeEach( () => {
      mongoose.connection.collections['issues'].drop( ( err ) => {
        if ( err ) {
          console.log( err );
        }
      });
    });

    it ( 'Throws an error if it is being updated with invalid properties', ( done ) => {
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

      Issue.createIssue( mockIssue )
      .then( () => {
        return Issue.updateIssue( mockIssue, mockUpdatedIssue )
      })
      .then( issue => {
        assert.ok( false );
        done();
      })
      .catch( err => {
        assert.ok( true );
        done();
      });

    });

    it ( 'Updates the Issue in the database', ( done ) => {
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

      Issue.createIssue( mockIssue )
      .then( () => {
        return Issue.updateIssue( mockIssue, mockUpdatedIssue );
      })
      .then( updatedIssue => {
        Object.keys( mockUpdatedIssue ).forEach( key => {
          assert.equal( updatedIssue[ key ], mockUpdatedIssue[ key ] );
        });
        done();
      })
      .catch( err => {
        assert.ok( false );
        done();
      });

    });
  });

  describe( '#deleteIssue', () => {
    beforeEach( () => {
      mongoose.connection.collections['issues'].drop( ( err ) => {
        if ( err ) {
          console.log( err );
        }
      });
    });

    it ( 'Throws an error if Issue to be deleted is not there', ( done ) => {
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

      Issue.createIssue( mockIssues[0] )
      .then( () => {
        return Issue.deleteIssue( mockIssues[1] );
      })
      .then( () => {
        assert.ok( false );
        done();
      })
      .catch( err => {
        assert.ok( true );
        done();
      });

    });

    it ( 'Deletes the Issue from the database', ( done ) => {
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

      Issue.createIssue( mockIssue )
      .then( () => {
        Issue.readIssues()
        .then( issues => {
          assert.lengthOf( issues, 1, 'There should be 1 issue in collection');
        })
        .then( () => {
          return Issue.deleteIssue( mockIssue )
        })
        .then( deletedIssue => {
          Object.keys( mockIssue ).forEach( key => {
            assert.equal( deletedIssue[ key ], mockIssue[ key ] );
          });

          Issue.readIssues()
          .then( issues => {
            assert.lengthOf( issues, 0, 'There should be 0 issue in collection');
            done();
          });
        })
        .catch( err => {
          assert.ok( false );
          done();
        })
      });

    });
  });

});
