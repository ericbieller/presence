var Flux = require('delorean').Flux;
var AppStore = require('../stores/app-store');
var UserStore = require('../stores/user-store');
var UsersStore = require('../stores/users-store');
var AuthStore = require('../stores/auth-store');

var AppDispatcher = Flux.createDispatcher({
    getStores: function() {
        return {
            appStore: AppStore,
            userStore: UserStore,
            usersStore: UsersStore,
            authStore: AuthStore
        }
    }
});

AppDispatcher._dispatch = AppDispatcher.dispatch;
AppDispatcher.dispatch = function(action, payload) {
  var args = Array.prototype.slice.call(arguments);
  var options = args[2];
  
  // run callbacks for transaction_id if available
  if (options) {
    if (typeof options == 'string') {
      var transaction = transactions[options];

      // okay, we have a transaction for this renderer
      if (transaction) {
        if (action.match(/^error/i)) {
          if (typeof transaction.error == 'function') transaction.error(payload);
        } else {
          if (typeof transaction.success == 'function') transaction.success(payload);
        }
  
        // remove once fulfilled
        delete transactions[options];
      }

    // translate callbacks into transaction_id
    } else if (typeof options == 'object') {

      var transaction_id = utilities.generateTransactionId();
      transactions[transaction_id] = options;
      args[2] = transaction_id;
    }
  }
  
  return AppDispatcher._dispatch.apply(this, args);
};

module.exports = AppDispatcher;