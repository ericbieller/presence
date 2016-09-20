var mongoose = require("mongoose");
var User = require("../data/user");
var Org = require("../data/organization");
var config  = require('../config');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var _ = require("underscore");

var router = require("express").Router();
router.route("/sessions/create").post(createSession);
router.route("/users/create").post(createUser);

function createSession(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  
  if (!email || !password) {
    return res.status(401).send("Please enter both an email and a password!");
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
      return res.status(401).send("Invalid email / password combo!");
    }
  });
}

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

function createUser(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  
  if (!email || !password) {
    return res.status(401).send("Please enter both an email and a password");
  }
  
  if (!name) {
    return res.status(401).send("Please tell us your name!");
  }
  
  var user = User.findOne({email: email}, function(err, user) {
    if (user) {
      return res.status(401).send("User already exists!");
    } else {
      // Save new organization
      var org_data = {
        name: ''
      }
  
      var org = new Org(org_data);
  
      org.save(function(error, data){
        if (error){
          res.status(400).json(error);
        } else {
          // Save new user

          var user_data = {
            email: email,
            password: hashPassword(password),
            name: name,
            organization_id: org.id
          }
  
          user = new User(user_data);
  
          user.save(function(error, data){
            if (error){
              res.status(400).json(error);
            } else {
              // Send login token back to client
              res.status(201).send({
                id_token: createToken(user)
              });
            }
          });
        }
      });
    }
  });
}

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  
  return hash;
}

module.exports = router;