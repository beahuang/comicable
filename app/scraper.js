'use strict'

const rp = require('request-promise');
const cheerio = require('cheerio');

let scrape = () => {
  let opts = {
    uri: 'https://pulllist.comixology.com/thisweek/',
    transform: body => {
      return cheerio.load( body );
    }
  };

  rp( opts )
  .then( $ => {
    getIssues( $ );
  })
  .catch( err => {
    console.log(`Request-Promise choked on the URL, gg ${ err }`);
  });
}

/**
 * Returns relevant issue information from loaded html as an Issue Object
 * @param { CheerioObject } DOM Element wrapped in Cheerio
 * @return { [Issue] } Array of Issue Objects
 */
let getIssues = ( $ ) => {
  const blockSelector = '#list-items > div #listings > tr';

  let issuesArray =  [];

  $( blockSelector ).map( ( index, block )=> {
    let imgURL = $( block ).find('#image a img' ).attr('src');
    let issueTitle = $( block ).find('#synopsis #title a').text();
    let seriesTitle = issueTitle.split(' #')[ 0 ];
    let issueNumber = issueTitle.split(/(?:#([0-9]*))/g)[ 1 ];

    issuesArray.push({
      issueTitle,
      imgURL,
      seriesTitle,
      issueNumber
    });

  });

  return issuesArray;
}

scrape();

/**
 * Change the URL that is being loaded into cheerio
 * @param { string } Publisher (dc_comics or marvel)
 * @param { string } Date (ex: 2016/05/11)
 * @return { string } URL
 */
let changeURL = ( publisher, date ) => {
  let startIssue = 0;
  let baseURL = 'https://pulllist.comixology.com'
  let url = `${ baseURL }/${ publisher }/${ date }/?start=${ startIssue }`;

  let opts = {
    uri: url,
    transform: body => {
      return cheerio.load( body );
    }
  }
  rp( opts )
  .then( $ => {
    let numPages = 0;
    const paginationSelector = '#items';
    numPages = $( paginationSelector ).length - 1 ;

    // TODO: Loop through numPages and increment end of startIssue by 20
    while ( numPages > 0 ) {

      // get comics for the url

      // change the url

      // get comics again
    }
  })
  .catch( err => {
    console.log(`Request-Promise didn't work when counting pages ${ err }`);
  });

  return url;
}

changeURL('dc_comics', '2016/05/11');
