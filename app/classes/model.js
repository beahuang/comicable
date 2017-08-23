let mongoose = require('mongoose');
let db = require('../db/db');


/**
 * A generic model class that will take a collection name and a mongoose schema
 * obj declaration and then save them to the model. It will also establish the
 * database connection for this Model
 */
class Model {

  /**
   * Constructor for creating a model
   * @param  {String} name   - Name of the model, plural collection in the database
   * @param  {Object} schema - Mongoose-style schema object for this Model
   */
  constructor( name, schema ) {
    this.name = name;
    this.schema = new mongoose.Schema( schema );

    this._model = db.model( this.name, this.schema );
  }

  /**
   * Mongoose wrapper that can insert one or many documents into the database
   *
   * @param  {Object|Array} docs   - One or more documents to insert
   * @return {Object|Array}        - The newly inserted docs
   */
  insert( docs ) {
    return this._model.create( docs );
  }

  /**
   * Finds a document from this collection given its id
   *
   * @param  {String} id - String representation of ObjectID
   * @return {Promise}   - A Promise that will resolve to the one document
   */
  findById( id ) {
    return this._model.findById( id );
  }

  /**
   * Finds one document that matches the given query
   *
   * @param  {Object} query - Object with keys and values to match against
   * @param  {String} proj  - Optional projection keys to return or match against
   *
   * @return {Promise}      - A Promise that will resolve to one document
   */
  findOne( query, proj ) {
    return this._model.findOne( query, proj = null );
  }

  /**
   * Finds many documents that match the given query
   *
   * @param  {Object} query - Object with keys and values to match against
   * @param  {String} proj  - Optional projection keys to return or match against
   *
   * @return {Promise}      - A Promise that will resolve to an array of documents
   */
  async find( query, proj = null ) {
    return await this._model.find( query, proj );
  }

  /**
   * Updates one document given an id and an object of values to update
   * http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
   *
   * @param  {String} id      - String representation of ObjectID
   * @param  {Object} updates - Keys and values to update on this object
   * @param  {Object} opts    - Mongoose update options
   *
   * @return {Promise}        - A Promise that will resolve to the updated document
   */
  async update( id, updates, opts ) {
    const options = {
      new: true,
      upsert: false,
      runValidators: true
    };

    const updateOpts = Object.assign( {}, options, opts );

    return await this._model.findByIdAndUpdate( id, updates, updateOpts );
  }

  /**
   * Deletes a document from this collection given its id
   *
   * @param  {String} id - String representation of ObjectID
   * @return {Object}    - The deleted document
   */
  async remove( id ) {
    return await this._model.findByIdAndRemove( id );
  }

}

module.exports = Model;
