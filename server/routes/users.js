const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Joi = require('joi');
const User = require('../models/user');


router.post('/register', (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	//Check if email and password are valid using Joi
	const schema = {
				email: Joi.string().email(),
				password: Joi.string().regex(/^[a-z0-9]{6,16}$/)
			}
	const {error, value} = Joi.validate({email: email, password: password}, schema);
	if(error){
			switch(error.details[0].context.key){
				case 'email':
					return res.send({
						success: false,
						error: 'You must provide a valid email address'
					});
					break;
				case 'password':
					return res.send({
						success: false,
						error: "The password provided failed to match the following rules:<br>1. It must ONLY contain the following characters: lower case letters, numbers.<br>2. It must be at least 6 characters in length and not greater than 16 characters in length."
					});
					break;
				default:
					return res.send({
						success: false,
						error: 'Invalid registration information'
					})
			}
		}
	//Check if email is already used
	User.getUserByEmail(email, (err, user) => {
		if(user){
			return res.send({success: false, error:"Email already used!"});
		}
		else {
			let newUser = new User({
			email: email,
			password: password
			});

			User.addUser(newUser, (error, user) => {
				if (error) {
					return res.send({success: false, error: 'Failed to register user.'});
				}
				else {
					return res.send({success: true, msg: 'User created successfully! You can now login.'});
				}
			});
		}
	});

});

module.exports = router;