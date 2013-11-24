// Settlement Schema
// 
//
//

var mongoose = require('mongoose');

var snippet_schema = new mongoose.Schema(
	{
		author: {type: String, required: true}
		,text: {type: String, required: true}
	}
)

var qa_schema = new mongoose.Schema(
	{
		q : {type: mongoose.Schema.ObjectId, ref: snippet_schema, required: true}
		,a : {type: mongoose.Schema.ObjectId, ref: snippet_schema}
		,stage: {type: Number, required: true}
	}
);

var set_schema = new mongoose.Schema(
	{
		email: {type: String, required: true}
		,type: {type: String, required: true}
		,address: {type: String, required: true}
		,'city/suburb': {type: String, required: true}
		,'post code' : {type: String, required: true}
		,value: {type: Number, required: false}
		,complete: {type: Boolean, default: false}
		,agent: {type: String, required: false}
		,stage: {type: Number, required: true, default: 1}
		,qa: [qa_schema]
	}
);

var user_schema = new mongoose.Schema(
	{
		last_name: {type: String, required: true}
		,first_name: {type: String, required: true}
		,email: {type: String, required: true}
		,token: {type: String, required: true, default: null}
		,address: {type: String, required: true}
		,'city/suburb': {type: String, required: true}
		,'post code': {type: String, required: true}
		,settlements: [set_schema]
	}
)

module.exports = mongoose.model('Settlement',set_schema);
