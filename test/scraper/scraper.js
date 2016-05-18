'use strict';

const modulePath = '../../app/scraper/scraper.js';
const assert = require('chai').assert;
const Promise = require('bluebird');
const mockHTML = require('../fixtures/mockHTML.js');

describe( 'Scraper', () => {

  describe( '#getIssues', () => {

    it('Parses an array of Issues correctly out of HTML', () => {
      let scraper = require('rewire')( modulePath );
      const $issues = require('rewire')('cheerio').load( mockHTML.issuesHTML );

      assert.sameDeepMembers( scraper.getIssues( $issues ),
        [{
          issueTitle: 'Agents of S.H.I.E.L.D. (2016-) #5 Aso',
          imgURL: 'https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/PrintItem/501600/MAR160802._SX200_QL80_TTD_.jpg',
          seriesTitle: 'Agents of S.H.I.E.L.D. (2016-)',
          issueNumber: 5
        }, {
          issueTitle: 'Constantine: The Hellblazer (2015-) #12',
          imgURL: 'https://images-na.ssl-images-amazon.com/images/S/cmx-images-prod/PrintItem/500366/MAR160189._SX200_QL80_TTD_.jpg',
          seriesTitle: 'Constantine: The Hellblazer (2015-)',
          issueNumber: 12
        }]);

    });

    it ('Gets an empty array given garbage html', () => {
      let scraper = require('rewire')( modulePath );
      const $fake = require('rewire')('cheerio').load('<div>Death</div>');

      assert.sameMembers( scraper.getIssues( $fake ), [] );
    });
  });

  describe( '#grabPublisherURLs', () => {

    it( 'Returns a Promise', () => {
      let scraper = require('rewire')( modulePath );
      let mockRP = () => {
        return new Promise( ( resolve, reject ) => {
          return 1;
        });
      };

      scraper.__set__( 'rp', mockRP );
      assert.instanceOf( scraper.grabPublisherURLs(), Promise );
    });

    it( 'Throws if RP fails', ( done ) => {
      let scraper = require('rewire')( modulePath );
      let mockRP = () => {
        return new Promise( ( resolve, reject ) => {
          reject( { statusCode : 404 } );
        });
      };
      scraper.__set__( 'rp', mockRP );

      scraper.grabPublisherURLs()
        .then( () => {
          assert.ok( false );
          done();
        })
        .catch( err => {
          assert.ok( err );
          done();
        });
    });
  });

  describe( '#generateURLs', () => {

    it( 'Returns an Array', () => {
      let scraper = require('rewire')( modulePath );
      let mock$ = () => {};
      let mockPub = 'AlfredsMockPublishingCo';
      let mockDate = '1111/11/11';

      assert.isArray( scraper.generateURLs( mock$, mockPub, mockDate ) );
    });

    it( 'Given all the correct params gets us URLs from a page', () => {
      let $ = require('rewire')('cheerio').load( mockHTML.pageNumberHTML );
      let scraper = require('rewire')( modulePath );

      assert.sameMembers( scraper.generateURLs( $, 'marvel', '1994/07/06' ),
        [ 'https://pulllist.comixology.com/marvel/1994/07/06/?start=20',
        'https://pulllist.comixology.com/marvel/1994/07/06/?start=40',
        'https://pulllist.comixology.com/marvel/1994/07/06/?start=60' ] );
    });

    it ( 'Returns an error if not passed a function as first arg', () => {
      let scraper = require('rewire')( modulePath );

      assert.throws( scraper.generateURLs, TypeError );
    });
  });

  describe( '#makeURL', () => {

    it('Forms a URL string for you given correct params', () => {
      let scraper = require('rewire')( modulePath );

      assert.equal( scraper.makeURL( 0, 'marvel', '1994/07/06' ),
        'https://pulllist.comixology.com/marvel/1994/07/06/?start=0' );
    });
  });
});
