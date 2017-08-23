const modulePath = '../../app/classes/model';
const sinon = require('sinon');
const { assert } = require('chai');
const { Schema, connection } = require('mongoose');
const db = require('../../app/db/db');

describe( 'classes/model', () => {

  describe( '#constructor', () => {

    it( 'has a schema property that is of type mongoose.Schema', () => {
      const Model = require('rewire')( modulePath );

      const instance = new Model( 'model', { name: 'String' } );

      assert.instanceOf( instance.schema, Schema );
    });

    it( 'creates the model in the database', () => {
      const Model = require('rewire')( modulePath );
      const modelStub = sinon.stub();
      const testSchema = { foo: 'String' };

      Model.__set__( 'db.model', modelStub );
      const instance = new Model( 'model', testSchema );

      assert.ok( modelStub.calledWith( 'model', new Schema( testSchema ) ) );
    });
  });

  describe( '#insert', () => {
    // body...
  });

  describe( '#findById', () => {
    // body...
  });

  describe( '#findOne', () => {
    // body...
  });

  describe( '#find', () => {

  });

  describe( '#update', () => {

    it( 'updates a document from this collection given an id', async () => {

    });
  });

  describe( '#remove', () => {
    it( 'deletes a document from this collection given an id', async () => {

    });
  });

});
