'use strict'

const modulePath = '../../app/scraper/scraper.js';
const expect = require('chai').expect;
const assert = require('chai').assert;
const Promise = require('bluebird');
const mockHTML = require('../fixtures/mockHTML.js');

describe( 'Scraper', () => {

  describe( '#getIssues', () => {

  });

  describe( '#grabPublisherURLs', () => {


  });

  describe( '#generateURLs', () => {

    it( 'Returns an Array', () => {
      let scraper = require('rewire')( modulePath );
      let mock$ = () => {};
      let mockPub = 'AlfredsMockPublishingCo';
      let mockDate = '1111/11/11';

      expect( scraper.generateURLs( mock$, mockPub, mockDate ) ).to.be.empty;
    });

    it( 'Given all the correct params gets us URLs from a page', () => {
      let $ = require('rewire')('cheerio').load( mockHTML.pageNumberHTML );
      let scraper = require('rewire')( modulePath );

      expect( scraper.generateURLs( $, 'marvel', '1994/07/06' ) )
      .to.have.members(
        [ 'https://pulllist.comixology.com/marvel/1994/07/06/?start=20',
          'https://pulllist.comixology.com/marvel/1994/07/06/?start=40',
          'https://pulllist.comixology.com/marvel/1994/07/06/?start=60' ]
      );
    });

    it ( 'Returns an error if not passed a function as first arg', () => {
      let scraper = require('rewire')( modulePath );

      expect( scraper.generateURLs ).to.throw( TypeError );
    });
  });

  describe( '#makeURL', () => {

    it('Forms a URL string for you given correct params', () => {
      let scraper = require('rewire')( modulePath );

      expect( scraper.makeURL( 0, 'marvel', '1994/07/06' ) )
      .to.equal( 'https://pulllist.comixology.com/marvel/1994/07/06/?start=0' );

    });

  });
});
