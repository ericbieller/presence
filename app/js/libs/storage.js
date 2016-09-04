var Config = require('../../config');
var persona = Config.persona || '';
var env = Config.environment;

var Storage = {
  set: function(key, value) {
    return localStorage.setItem(env + persona + '-' + key, JSON.stringify(value));
  },
  
  get: function(key) {
    return JSON.parse(localStorage.getItem(env + persona + '-' + key) || false);
  }
}

module.exports = Storage;