var mongoose = require("mongoose");
var User = require("../data/user");
var config  = require('../config')
var Pusher = require("pusher");
var session = require('express-session');
var _ = require("underscore");

var pusher = new Pusher({ appId: '215270', key: 'd1e2d702d21604832b42', secret:  'b34a3acdbf596bafcd29' });

var router = require("express").Router();
router.route("/pusher/auth").post(auth);

function auth(req, res) {
  user_id = req.session.user_id;
  email = req.session.email;
    
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var presenceData = {
    user_id: user_id,
    user_info: {
      email: email
    }
  };
  var auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
}

module.exports = router;