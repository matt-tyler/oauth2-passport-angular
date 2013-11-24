var user = require('../models/user');
var settlement = require('../models/settlement');

var UserHandler = function() {
	this.createUser = handleCreateUserRequest;
	this.getUsers = handleGetUsersRequest;
	this.getUser = handleGetUserRequest;
	this.updateUser = handleUpdateUserRequest;
	this.deleteUser = handleDeleteUserRequest;
	console.log("User Handler Set Up");
};

function handleCreateUserRequest(req,res) {
	console.log(req.params);
};

function handleGetUsersRequest(req,res) {
	console.log("I am here");
	user.find({}, function (err, users) {
		if(err) {
			console.log(err);
		}	
		else {
			res.send(users);
		}
	});	
};

function handleGetUserRequest(req,res) {
	console.log("At User Request");
	console.log(req.query.token);
	user.findOne().where('token').equals(req.query.token).exec(function( err, user) {
		console.log(err);
		console.log(user);
		if(err) {
			console.log(err);
			return res.send(500,err);
		}
		if(!user){
			return res.send(401,"User Not Authenticated");
		}
		if(user) {
			settlement.find({'email':user.email},function(err,settlements) {
				user.settlements = settlements;
				return res.send(200,settlements);
			});
		}
	});
};

function handleUpdateUserRequest(req,res) {
	var dummy = {text: "dummy get"};
	res.json = (200, dummy);
};

function handleDeleteUserRequest(req,res) {
	var dummy = {text: "dummy get"};
	res.json = (200, dummy);
};

module.exports = UserHandler;

