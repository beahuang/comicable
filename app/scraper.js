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
    const blockSelector = '#list-items > div #listings > tr ';

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

  })
  .catch( err => {
    console.log(`Request-Promise choked on the URL, gg ${ err }`);
  });
}

scrape();
