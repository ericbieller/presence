var Flux = require('delorean').Flux;
var jwt = require('jsonwebtoken');
var config = require('../../config.js');

module.exports = Flux.createStore({
    user: {
      id: '',
      name: null,
      email: '',
      password: '',
      token: null,
      snapshot: localStorage.getItem('snapshot'),
      organization_id: null,
      idle_status: 'active'
    },
    
    actions: {
      'user.login':               'update',
      'snapshot.updated':         'updateSnapshot',
      'user.update_idle_status':  'updateIdleStatus'
    },
    
    update: function(token) {
      var userInfo = jwt.verify(token, config.secret);
      
      this.user.id = userInfo._id;
      this.user.email = userInfo.email;
      this.user.token = userInfo.token;
      this.user.name = userInfo.name;
      this.user.organization_id = userInfo.organization_id;
    },
    
    updateSnapshot: function(data) {
      // Only update snapshot in user store if it's current user's
      if (data.id == this.user.id) {
        this.user.snapshot = data.snapshot;      
        this.emit('change');
      }
    },
    
    updateIdleStatus: function(data) {
      this.user.idle_status = data.idle_status;
    }
});