var Flux = require('delorean').Flux;
var UserStore = require('../stores/user-store');
var _ = require('underscore');

module.exports = Flux.createStore({
  items: {},
  
  actions: {
    'channel.joined':      'channelJoined',
    'user.added':        'userAdded',
    'user.removed':      'userRemoved',
    'snapshot.updated':  'updateSnapshot'
  },
  
  channelJoined: function(data) {
    console.log('CHANNEL JOINED')
    // Ensure users object is empty before populating with online users
    this.items = {};
    
    // Populate current user
    var current_user = UserStore.user;
    this.items[current_user.id] = { id: current_user.id, email: current_user.email, snapshot: current_user.snapshot, me: true }
    
    var me = false;
    var self = this;
    
    // Populate users-store with current users in 
    _.each(data.members, function(member, user_id) {
      if (current_user.id != user_id) {
        self.items[user_id] = { id: user_id, email: member.email, me: false};
      }
    });
    
    this.emit('change');
  },
  
  userAdded: function(data) {
    console.log('adding user to store');
    this.items[data.id] = { id: data.id, email: data.info.email, snapshot: null, me: false };
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
});