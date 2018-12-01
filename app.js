var express = require('express');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var uri2 = "mongodb+srv://farouk-hajji:jnrcs329)@testing-slkxh.mongodb.net/test?retryWrites=true";
var uri = "mongodb://mongo-alpine:27017/";
var app = express();

app.use('/data/from/db', function (req, res, next) {

    client.connect(uri2, function (err, client) {
        if (err) throw err;

        var db = client.db('testing');

        db.collection('users').find({}).toArray(function (err, docs) {
            if (err) return next(err);
            return res.json(docs);
        });
        client.close();
    });
});
app.use('/data/into/db', function (req, res, next) {
    client.connect(uri2, function (err, client) {
        if (err) throw err;

        var db = client.db('testing');
        var userName = 'farouk';
        var userEmail = 'farouk.hajji@esprit.tn';
// Submit to the DB
        db.collection('users').insert({
            "username": userName,
            "email": userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            } else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                //res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
            client.close();
        });
    });
});

    module.exports = app;
