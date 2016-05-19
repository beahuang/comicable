'use strict'

let rp = require('request-promise');
let cheerio = require('cheerio');

/**
 * Takes in a publisher and gets
 * @param  {[type]} publisher [description]
 * @return {[type]}           [description]
 */
let scrape = ( publisher ) => {
  let today = new Date( Date.now() );
  let dateObj = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate()
  }

  let dateString = `${ dateObj.year }/${ dateObj.month }/${ dateObj.day }`;

  let urlsArrayPromise = grabPublisherURLs( publisher , dateString );
  let issuesArray = [];

  return urlsArrayPromise
  .then( allURLs => {
    let requestPromiseArray = allURLs.map( ( url, index ) => {
      return rp( url );
    });

    return Promise.all( requestPromiseArray );
  })
  .then( allBodies => {
    allBodies.map( ( body, index ) => {
      let cheerioBody = cheerio.load( body );
      issuesArray = issuesArray.concat( getIssues( cheerioBody ) );
    });

    return issuesArray;
  })
  .catch( err => {
    throw new Error( err );
  });
}

/**
 * Returns relevant issue information from loaded html as an Issue Object
 * @param   { Function }  DOM Element wrapped in Cheerio, it's a function
 * @return  { Array }     Array of Issue Objects
 */
let getIssues = ( $ ) => {
  const blockSelector = '#list-items > div #listings tr';

  let issuesArray =  [];

  $( blockSelector ).map( ( index, block )=> {
    let imgURL = $( block ).find('#image a img' ).attr('src');
    let issueTitle = $( block ).find('#synopsis #title a').text().trim();
    let seriesTitle = issueTitle.split(' #')[ 0 ].trim();
    let issueNumber = parseInt( issueTitle.split(/(?:#([0-9]*))/g)[ 1 ] );

    issuesArray.push({
      issueTitle,
      imgURL,
      seriesTitle,
      issueNumber
    });

  });

  return issuesArray;
}

/**
 * Change the URL that is being loaded into cheerio
 * @param { String } Publisher  (dc_comics or marvel)
 * @param { String } Date       (ex: 2016/05/11)
 * @return { Array }            Array of URLs
 * @throws { Error }            If Request-Promise 404's or fails
 */
let grabPublisherURLs = ( publisher, date ) => {
  let opts = {
    uri: makeURL( 0, publisher, date ),
    transform: body => {
      return cheerio.load( body );
    }
  };

  return rp( opts )
  .then( $ => {
    // Uncomment this when we have a db, so then a real test can be written
    // let firstPage = getIssues( $ );
    return generateURLs( $, publisher, date );
  })
  .catch( err => {
    throw new Error('Something failed in grabPublisherURLs\n', err );
  });
}

/**
 * After taking a number to start with, a publisher and a date, creates
 * 1 URL to hit comixology.
 * @param { Number } startIssue The first issue to get
 * @param { String } Publisher  (dc_comics or marvel)
 * @param { String } Date       (ex: 2016/05/11)
 * @return { String }           URL to hit
 */
let makeURL = ( startIssue, publisher, date ) => {
  // TODO: Change to config const
  let baseURL = 'https://pulllist.comixology.com'

  return `${ baseURL }/${ publisher }/${ date }/?start=${ startIssue * 20 }`;
}

/**
 * After having hit a page structured like
 * https://pulllist.comixology.com/marvel/2016/05/11
 * this function figures out the URLs for all the pages with comics for this day
 *
 * @param  { Function } $   This is the HTML of the page after
 *                          being loaded into cheerio,
 *                          It's an invokable function
 * @return { Array }        Array of URLs for all the pages of this date/pub
 */
let generateURLs = ( $, publisher, date ) => {
  const numToTakeOff = 2; // First request, and "next" link
  const pageSelector = '#items';
  let numPages = 0;

  if ( $( pageSelector ) && $( pageSelector ).length ) {
    numPages = $( $( pageSelector )[ 0 ] ).children().length - numToTakeOff;
  }

  let urlsArray = [];

  while ( numPages > 0 ) {
    urlsArray.push( makeURL( numPages, publisher, date ) );
    numPages--;
  }

  return urlsArray;
}

module.exports = {
  scrape,
  getIssues,
  grabPublisherURLs,
  makeURL,
  generateURLs
}

