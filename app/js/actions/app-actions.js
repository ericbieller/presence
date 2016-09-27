var AppDispatcher = require('../dispatcher/app-dispatcher.js');

var AppActions = {
    show: function(page) {
      AppDispatcher.dispatch('app.show', page);
    },
    
    bannerError: function(message) {
      AppDispatcher.dispatch('banner.error', message);
    },
    
    bannerClose: function() {
      AppDispatcher.dispatch('banner.close');
    },
    
    showIncomingCall: function(data) {
      AppDispatcher.dispatch('incoming_call.show', data);
    },
    
    handleCallAnswer: function(data) {
      if (data.answer == true) {
        console.log('send call.accepted')
        AppDispatcher.dispatch('call.accepted', data);
      } else {
        console.log('send call.ignored')
        AppDispatcher.dispatch('call.ignored', data);
      }
    }
}

module.exports = AppActions;