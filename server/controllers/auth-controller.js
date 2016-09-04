var mongoose = require("mongoose");
var User = require("../data/user");
var config  = require('../config');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var _ = require("underscore");

var router = require("express").Router();
router.route("/sessions/create").post(createSession);

function createSession(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  
  if (!email || !password) {
    return res.status(401).send("Please enter both a username and a password");
  }

  var user = User.findOne({email: email}, function(err, user) {
    if (user) {
      var user = user.toObject();
      if (!bcrypt.compareSync(password, user.password)){
        return res.status(401).send("Invalid username / password combo!");
      }
      // Save user session data
      req.session.user_id = user._id;
      req.session.email = email;
      req.session.name = user.name;
      
      res.status(201).send({
        id_token: createToken(user)
      });
    } else {
      return res.status(401).send("Invalid username / password combo!");
    }
  });
}

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

module.exports = router;