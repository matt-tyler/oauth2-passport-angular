// User Schema
//
// 

var mongoose = require('mongoose');

var schema =  new mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId
		,last_name: {type: String, required: true}
		,first_name: {type: String, required: true}
		,email: {type: String, required: true}
		,token: {type: String, required: false}
	}
);

module.exports = mongoose.model('User', schema);
