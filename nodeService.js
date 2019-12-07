Get Service

const express = require('express');
const app = express();
const mongo = require('mongodb');
app.use(express.json());

app.get('/', (req,res)=> {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("music");
 dbo.collection("tracks").find({}, {}).toArray(function(err, result) {
if (err) throw err;
console.log(result);
res.send(result);
db.close();
 });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}..`));

=======================

Put Service

const express = require('express');
const app = express();
const mongo = require('mongodb');
app.use(express.json());

app.put('/',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("music");
  var myquery = { track_name: "chandeliar" };
  var newvalues = { $set: {album_name: "cheap thrills"} };
  dbo.collection("tracks").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
	res.send(result);
    db.close();
  });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}..`));
----------
Post Service

const express = require('express');
const app = express();
const mongo = require('mongodb');
app.use(express.json());

app.post('/',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("music");
 var myobj = [{track_id: "159",
	track_name: "I'm a Mess",
	genre: "hip-hop",
	artist_id: "11",
	track_length: "3:59"},
	{track_id: "160",
	track_name: "Say my Name",
	genre: "Pop",
	artist_id: "11",
	track_length: "3:59"}];
 dbo.collection("tracks").insertMany(myobj, function(err, res) {
if (err) throw err;
console.log("2 documents inserted into tracks collection");
   db.close();
 });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}..`));
============================

Delete Service

const express = require('express');
const app = express();
const mongo = require('mongodb');
app.use(express.json());

app.delete('/',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("music");
   var myquery = { track_name: "/^W/" };
   dbo.collection("tracks").deleteMany(myquery, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    db.close();
  });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}..`));
