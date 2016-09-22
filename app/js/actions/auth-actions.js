var AppDispatcher = require('../dispatcher/app-dispatcher.js');

var AuthActions = {
    showError: function(message) {
      AppDispatcher.dispatch('autherror.show', message);
      AppDispatcher.dispatch('app.show', 'login');
    }
}

module.exports = AuthActions;