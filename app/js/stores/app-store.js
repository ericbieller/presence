var Flux = require('delorean').Flux;

module.exports = Flux.createStore({
    scheme: {
        content: 'login'
    },
    
    actions: {
      'app.show': 'show'
    },
    
    show: function(page) {
      console.log('show!');      
      this.set({content: page});
    }
});