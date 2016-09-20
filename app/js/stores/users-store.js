var Flux = require('delorean').Flux;
var UserStore = require('../stores/user-store');
var _ = require('underscore');

module.exports = Flux.createStore({
  items: {},
  
  actions: {
    'channel.joined':           'channelJoined',
    'user.added':               'userAdded',
    'user.removed':             'userRemoved',
    'snapshot.updated':         'updateSnapshot',
    'user.update_idle_status':  'updateIdleStatus'
  },
  
  channelJoined: function(data) {
    console.log('CHANNEL JOINED')
    // Ensure users object is empty before populating with online users
    this.items = {};
    
    // Populate current user
    var current_user = UserStore.user;
    this.items[current_user.id] = { 
      id: current_user.id, 
      email: current_user.email, 
      name: current_user.name, 
      snapshot: current_user.snapshot, 
      me: true,
      idle_status: 'active'
    }
    
    var me = false;
    var self = this;
    
    // Populate users-store with current users logged in 
    _.each(data.members, function(member, user_id) {
      if (current_user.id != user_id) {
        console.log(member)
        self.items[user_id] = { 
          id: user_id, 
          email: member.email, 
          name: member.name, 
          me: false,
          idle_status: 'active'
        };
      }
    });
    
    this.emit('change');
  },
  
  userAdded: function(data) {
    console.log('adding user to store');
    this.items[data.id] = { 
      id: data.id, 
      email: data.info.email, 
      name: data.info.name, 
      snapshot: null, 
      me: false, 
      idle_status: 'active'
    };
    this.emit('change');
  },
  
  userRemoved: function(data) {
    console.log('removing user from store');
    delete this.items[data.id]
    this.emit('change');
  },
  
  updateSnapshot: function(data) {
    console.log('updating snapshot in store')
    this.items[data.id].snapshot = data.snapshot;
    this.emit('change');
  },
  
  getCurrentUser: function() {
    return _.findWhere(this.items, {me: true});
  },
  
  updateIdleStatus: function(data) {
    this.items[data.user_id].idle_status = data.idle_status
    this.emit('change');
  }
});