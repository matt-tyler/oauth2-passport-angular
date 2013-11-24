var express = require('express')
	,routes = require('./routes')
	,auth_routes = require('./handlers/AuthHandler')
	,UserHandler = require('./handlers/UserHandler')
	,AuthHandler = require('./handlers/AuthHandler')
	,passport = require('passport')
	,mongoose = require('mongoose')
	,UserDB = require('./models/user')

var app = express();

var google_strategy = require('passport-google-oauth').OAuth2Strategy;

app.configure(function() {

	app.set('client-url','http://localhost:8000');
	app.set('client-google-signin','/google?action=signin');
	app.disable('x-powered-by');

	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(passport.initialize());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    if ('OPTIONS' == req.method) {
    	res.send(200);
    }
    else {
    	next();
    }
}; 

app.configure('development', function() {
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
	console.log("Starting in development mode");
});


mongoose.connect('mongodb://localhost/YOUR MONGO SERVER');

var db = mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("Connected to db");
});


passport.use(new google_strategy({
    clientID: 'YOUR CLIENT ID',
    clientSecret: 'YOUR CLIENT SECRET',
    callbackURL: 'http://devbox.example.com:3000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
	UserDB.findOne({email: profile._json.email},function(err,usr) {
		usr.token = accessToken;	
		usr.save(function(err,usr,num) {
			if(err)	{
				console.log('error saving token');
			}
		});
		process.nextTick(function() {
			return done(null,profile);
		});
	});
  }
));


var handlers = {
	user: new UserHandler(),
	auth: new AuthHandler()
};

routes.setup(app,handlers);

app.listen(3000);
console.log('Listening on port 3000');


