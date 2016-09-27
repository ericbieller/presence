var mongoose = require("mongoose");
var OpenTok = require('opentok');
var config  = require('../config');

var _ = require("underscore");

var router = require("express").Router();
router.route("/calls/create").post(createCall);

function createCall(req, res) {
  // Create a session that will attempt to transmit streams directly between 
  // clients. If clients cannot connect, the session uses the OpenTok TURN server: 
  opentok = new OpenTok(config.opentokPublic, config.opentokSecret);

  opentok.createSession({mediaMode:"relayed"}, function(error, session) {
    if (error) {
      return res.status(401).json(error);
    } else {
      var sessionId = session.sessionId;
      
      // Define options for token generation
      var tokenOptions = {};
      tokenOptions.role = "publisher";
      
      // Generate token
      var token = opentok.generateToken(sessionId), tokenOptions;
      
      return res.status(201).send({
        sessionId: sessionId,
        token: token
      });
    }
  });
}

module.exports = router;