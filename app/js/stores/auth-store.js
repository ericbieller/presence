var Flux = require('delorean').Flux;

module.exports = Flux.createStore({
    scheme: {
        error: null
    },
    
    actions: {
      'autherror.show': 'showError'
    },
    
    showError: function(message) {
      this.set({error: message})
      this.emit('change');
    }
});