var Flux = require('delorean').Flux;
var jwt = require('jsonwebtoken');
var config = require('../../config.js');

module.exports = Flux.createStore({
    user: {
      id: '',
      email: '',
      password: '',
      token: null,
      snapshot: localStorage.getItem('snapshot')
    },
    /*user: {
      snapshot: localStorage.getItem('snapshot');
    },*/
    
    actions: {
      'user.login':            'update',
      'snapshot.updated':      'updateSnapshot'
    },
    
    update: function(token) {
      var userInfo = jwt.verify(token, config.secret);
      
      this.user.id = userInfo._id;
      this.user.email = userInfo.email;
      this.user.token = userInfo.token;
    },
    
    updateSnapshot: function(data) {
      // Only update snapshot in user store if it's current user's
      if (data.id == this.user.id) {
        this.user.snapshot = data.snapshot;      
        this.emit('change');
      }
    }
});