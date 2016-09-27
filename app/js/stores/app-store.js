var Flux = require('delorean').Flux;

module.exports = Flux.createStore({
    scheme: {
        content: 'loading',
        banner_style: 'info',
        banner_message: null,
        banner_timeout: 10*1000,
        extension_id: "hbjenejhlinpfeddbgkglbenihfngopj"
    },
    
    actions: {
      'app.show':           'show',
      'banner.error':       'showErrorBanner',
      'banner.close':       'closeBanner',
      'incoming_call.show': 'showIncomingCall',
      'call.accepted':      'startCall',
      'call.ignored':       'cancelCall'
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
    
    showIncomingCall: function(data) {
      // Send user data to show notification from extension
      chrome.runtime.sendMessage(this.state.extension_id, {
        type: "incoming-call",
        call_info: data
      });
    },
    
    startCall: function() {
      console.log('start call')
    },
    
    cancelCall: function() {
      console.log('cancel call')
    }
});