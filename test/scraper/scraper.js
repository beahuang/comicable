'use strict'

const modulePath = '../../app/scraper/scraper.js';
const assert = require('chai').assert;
const Promise = require('bluebird');

describe('Scraper', () => {

  describe('#makeURL', () => {

    it('Forms a URL string for you given correct params', () => {
      let scraper = require('rewire')( modulePath );

      assert.equal(
        scraper.makeURL( 0, 'marvel', '1994/07/06' ),
        'https://pulllist.comixology.com/marvel/1994/07/06/?start=0'
      );

    });

  });
});
