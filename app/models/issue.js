let mongoose = require('mongoose');
let db = require('../db/db.js');

let issueSchema = new mongoose.Schema({
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
});

let Issue = db.model( 'Issue', issueSchema );

module.exports = Issue;
