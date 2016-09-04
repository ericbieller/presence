var $ = require("jquery");
var promise = require("es6-promise");
var UserActions = require("../actions/user-actions.js");
var resourceUrl = "/api/sessions/create";
var bcrypt = require('bcryptjs');

module.exports = {
  login: function(email, password) {
    var Promise = promise.Promise;
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: resourceUrl,
            data: JSON.stringify({email, password}),
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
              var token = response.id_token;
              UserActions.login(token);
            },
            error: reject
        });
    });
  }
}