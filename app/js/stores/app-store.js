var Flux = require('delorean').Flux;

module.exports = Flux.createStore({
    scheme: {
        content: 'loading',
        banner_style: 'info',
        banner_message: null,
        banner_timeout: 10*1000
    },
    
    actions: {
      'app.show':       'show',
      'banner.error':   'showErrorBanner',
      'banner.close':   'closeBanner'
    },
    
    show: function(page) {  
      this.set({content: page});
    },
    
    showErrorBanner: function(message) {
      this.set({
        banner_style: 'error',
        banner_message: message
      });
    },
    
    closeBanner: function() {
      this.set({
        banner_style: null,
        banner_message: null,
        banner_timeout: this.scheme.banner_timeout.default,
        banner_param: null
      });
    },
});