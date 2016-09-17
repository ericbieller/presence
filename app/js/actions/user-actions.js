var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var UserActions = require('../actions/user-actions.js');
var UserStore = require('../stores/user-store');
import { browserHistory } from 'react-router';

var UserActions = {
    login: function(token) {      
      // Save token in local storage
      localStorage.setItem('token', token);

      // Save user deets and show app now that user is logged in
      AppDispatcher.dispatch('user.login', token);
      AppDispatcher.dispatch('app.show', 'app');
      
      // Initial pusher connection
      this.pusher = new Pusher('d1e2d702d21604832b42', {
        authEndpoint: '/api/pusher/auth'
      });
      
      this.connectPusher();
    },
    
    logout: function() {
      // Remove token from local storage
      localStorage.removeItem('token');
      
      // Disconnect pusher
      this.pusher.unsubscribe('presence-test_channel2');
      
      // Show app now that user is logged in
      AppDispatcher.dispatch('app.show', 'login');
    },
    
    channelJoined: function(data) {
      AppDispatcher.dispatch('channel.joined', data);
      
      // Send my stored snapshot to current online users
      console.log('Send my stored snapshot to current online users');
      this.sendMySnapshot();
    },
    
    userAdded: function(data) {
      console.log('dispatching user.added');
      AppDispatcher.dispatch('user.added', data);
      
      // Send my latest snapshot to this newly added user
      console.log('Send my latest snapshot to this new user');
      this.sendMySnapshot();
    },
    
    userRemoved: function(data) {
      console.log('dispatching user.removed');
      AppDispatcher.dispatch('user.removed', data);
    },
    
    updateSnapshot: function(data) {
      AppDispatcher.dispatch('snapshot.updated', data);
      
      // Trigger pusher snapshot update event
      this.channel.trigger('client-update_snapshot', data);
      
      // Save new snapshot in local storage
      localStorage.setItem('snapshot', data.snapshot);
    },
    
    updateUserSnapshot: function(data) {
      AppDispatcher.dispatch('snapshot.updated', data);
    },
    
    sendMySnapshot: function() {
      var current_user = UserStore.user;
      this.channel.trigger('client-update_snapshot', {id: current_user.id, snapshot: current_user.snapshot});
    },
    
    connectPusher: function() {
      // Subscribe to presence channel
      this.channel = this.pusher.subscribe('presence-test_channel2');
        
      var self = this;
      this.channel.bind('pusher:subscription_succeeded', function(data) {
        self.channelJoined(data);
      });

      this.channel.bind('pusher:member_removed', function(data) { 
        self.userRemoved(data) 
      });
      
      this.channel.bind('pusher:member_added', function(data) {
        self.userAdded(data);
      });
      
      this.channel.bind('client-update_snapshot', function(data) {
        self.updateUserSnapshot(data);
      });
    }
}

module.exports = UserActions;