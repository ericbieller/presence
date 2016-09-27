var AppDispatcher = require('../dispatcher/app-dispatcher.js');

var CallActions = {
    show: function(page) {
      AppDispatcher.dispatch('incoming.show', page);
    }
}

module.exports = AppActions;