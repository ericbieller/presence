var $ = require("jquery");
var promise = require("es6-promise");
import pusher from 'pusher';
var UserActions = require("../actions/user-actions.js");
var AuthActions = require("../actions/auth-actions.js");
var config = require('../../config.js');

var createResourceUrl = "/api/calls/create";

module.exports = {
  create: function(callInfo) {
    var Promise = promise.Promise;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: createResourceUrl,
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
              var sessionId = response.sessionId;
              var token = response.token;
              var session = OT.initSession(config.opentokPublic, sessionId);
              
              UserActions.sendIncomingCall(callInfo);
              /*session.connect(token, function(error) {
                if (error) {
                  console.log("Error connecting: ", error.code, error.message);
                } else {
                  
                  var publisher = OT.initPublisher($(".user"), null, function(error) {
                    if (error) {
                      // The client cannot publish.
                      // You may want to notify the user.
                    } else {
                      console.log('Publisher initialized.');
                    }
                  });
                  
                }
              });*/
            },
            error: function(response) {
              console.log(response)
            }
        });
    });
  }
}