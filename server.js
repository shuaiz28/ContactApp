var express = require('express');
var app = express();
//requires the mongojs module
var mongojs = require('mongojs');
//which mongo database and collection we are going to be using
var db = mongojs('contactList', ['contactList']);

var bodyParser = require('body-parser');

// app.get('/', function(req, res) {
// 	res.send("Hello from server.js");
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/contactList", function(req, res) {
	console.log("I received a GET request");

	/******    only used for retrieving data from server
	person1 = {
		name: "leo1",
		email: "leo1@gmail.com",
		number: "111 111 1111"
	};
	person2 = {
		name: "leo2",
		email: "leo2@gmail.com",
		number: "211 111 1111"
	};
	person3 = {
		name: "leo3",
		email: "leo3@gmail.com",
		number: "311 111 1111"
	};

	var contactList = [person1, person2, person3];

	//respond to the get request by sending back the contactList data in json format which the controller can then use
	res.json(contactList);

	*********/
	// docs means it will response with the documents or context from the database
	db.contactList.find(function(err, docs) {
		//make sure receive the data from the database
		console.log(docs);
		//sends the data back to the controller
		res.json(docs);
	});
});

//listen for the post request from the controller
app.post("/contactList", function(req, res) {
	console.log(req.body);
	//insert the input data into the mongodb database, doc=the item we parsed and received
	db.contactList.insert(req.body, function(err, doc) {
		//send back the data to the controller
		res.json(doc);
	});
});

app.delete("/contactList/:id", function(req, res) {
	var id = req.params.id;
	console.log(id);
	//doc refers the item we are removing
	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		//send back the item we are removing back to the controller
		res.json(doc);
	});
});

app.get("/contactList/:id", function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put("/contactList/:id", function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactList.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name : req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc) {
			res.json(doc);
		});
});


app.listen(3000);
console.log("Server running on port 3000");