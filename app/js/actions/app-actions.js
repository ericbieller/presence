var AppDispatcher = require('../dispatcher/app-dispatcher.js');

var AppActions = {
    show: function(page) {
      AppDispatcher.dispatch('app.show', page);
    }
}

module.exports = AppActions;