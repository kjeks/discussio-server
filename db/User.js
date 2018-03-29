const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'local';

var db = null;
var currentClient = null;
var topicsCollection = null;

const connect = function connect() {
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        currentClient = client;
        db = client.db(dbName);
        topicsCollection = db.collection('topics');

        // insertDocuments(db, function() {
        // });
        // findDocuments(db, function () {
        //
        // });
        // updateDocument(db, function () {
        //
        // });
        // removeDocument(db, function () {
        //
        // });

        //client.close();
    });
};

const findDocuments = function (collectionName, query, callback) {
    const collection = db.collection(collectionName);

    collection.find(query).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log('found', docs);
        callback(docs);
    });
};

const updateDocument = function (db, callback) {
    const collection = db.collection('topics');

    collection.updateOne({topic_id: 7},
        {$set: {topic_id: 8}}, function (err, result) {
            assert.equal(err, null);
            console.log(result, err);
            assert.equal(1, result.result.n);
            console.log("updated");
            callback(result);
        }
    )
};
const removeDocument = function (db, callback) {
    const collection = db.collection('topics');

    collection.deleteOne({topic_id: 8}, function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            callback(result);
        }
    )
};


const insertDocuments = function (db, callback) {
    const collection = db.collection('topics');

    collection.insertMany([
        {topic_id: 10, name: "test"}, {topic_id: 11}, {topic_id: 12}
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);

        callback(result);
    })
}
module.exports = {
    connect: connect,
    insert: insertDocuments,
    remove: removeDocument,
    find: findDocuments,
    update: updateDocument

}