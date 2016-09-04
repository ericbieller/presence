var Flux = require('delorean').Flux;

module.exports = Flux.createStore({
    scheme: {
        error: null
    },
    
    actions: {
      'autherror.show':       'showError'
    },
    
    showError: function(message) {
      console.log('ERROR');
      console.log(message);
      this.set({error: message})
    }
});