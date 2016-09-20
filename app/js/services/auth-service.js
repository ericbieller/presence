var $ = require("jquery");
var promise = require("es6-promise");
var UserActions = require("../actions/user-actions.js");
var AuthActions = require("../actions/auth-actions.js");
var loginResourceUrl = "/api/sessions/create";
var signupResourceUrl = "/api/users/create";
var bcrypt = require('bcryptjs');

module.exports = {
  login: function(email, password) {
    var Promise = promise.Promise;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: loginResourceUrl,
            data: JSON.stringify({email, password}),
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
              var token = response.id_token;
              UserActions.login(token);
            },
            error: function(response) {
              console.log("error: " + response.responseText)
              AuthActions.showError(response.responseText);
            }
        });
    });
  },
  
  signup: function(email, password, name) {
    var Promise = promise.Promise;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: signupResourceUrl,
            data: JSON.stringify({email, password, name}),
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
              var token = response.id_token;
              UserActions.login(token);
            },
            error: function(response) {
              console.log("error: " + response.responseText)
              AuthActions.showError(response.responseText);
            }
        });
    });
  },
}