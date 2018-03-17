const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = (passport) => {
	let options = {};
	options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
	options.secretOrKey = config.secret;
	passport.use(new JwtStrategy(options, (jwtPayload, done) => {
		User.getUserById(jwtPayload._id, (error, user) => {
			if (error){
				return done(error, false);
			}

			if(user){
				return done(null, user);
			}
			else{
				return done(null, false);
			}
		});
	}));
}