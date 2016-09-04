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
    }
}

module.exports = AppActions;