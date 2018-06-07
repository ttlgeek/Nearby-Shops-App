const express = require("express");
const router = express.Router();
const config = require("../config/database");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/user");

// Register

router.post("/register", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  //Check if email and password are valid using Joi
  const schema = {
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-z0-9]{6,16}$/)
  };
  const { error, value } = Joi.validate(
    { email: email, password: password },
    schema
  );
  if (error) {
    switch (error.details[0].context.key) {
      case "email":
        return res.send({
          success: false,
          errors: {
            global: { email: "You must provide a valid email address" }
          }
        });
        break;
      case "password":
        return res.send({
          success: false,
          errors: {
            global: {
              password:
                "The password provided failed to match the following rules:<br>1. It must ONLY contain the following characters: lower case letters, numbers.<br>2. It must be at least 6 characters in length and not greater than 16 characters in length."
            }
          }
        });
        break;
      default:
        return res.send({
          success: false,
          errors: {
            global: "Invalid registration information"
          }
        });
    }
  }
  //Check if email is already used
  User.getUserByEmail(email, (err, user) => {
    if (user) {
      return res.send({
        success: false,
        errors: {
          global: { email: "Email already used!" }
        }
      });
    } else {
      let newUser = new User({
        email: email,
        password: password
      });

      User.addUser(newUser, (error, user) => {
        if (error) {
          return res.send({
            success: false,
            errors: {
              global: "Failed to register user."
            }
          });
        } else {
          return res.send({
            success: true,
            msg: "User created successfully! You can now login."
          });
        }
      });
    }
  });
});

// Authentication

router.post("/auth", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.send({
        success: false,
        errors: {
          global: "User not found!"
        }
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 60 * 60 * 24 * 7 // 1 Week
        });

        return res.json({
          success: true,
          token: "JWT  " + token,
          user: {
            id: user._id,
            email: user.email
          }
        });
      } else {
        return res.send({
          success: false,
          errors: {
            global: "Wrong Password!"
          }
        });
      }
    });
  });
});

module.exports = router;
