var AppDispatcher = require('../dispatcher/app-dispatcher.js');

var AuthActions = {
    showError: function(message) {
      AppDispatcher.dispatch('autherror.show', message);
    }
}

module.exports = AuthActions;