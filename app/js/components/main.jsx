var React = require('react/addons');
var Flux = require('delorean').Flux;
var Login = require('./login.jsx');
var Signup = require('./signup.jsx');
var App = require('./app.jsx');

var Main = React.createClass({
  mixins: [Flux.mixins.storeListener],

  getContent: function(){
    var app = this.getStore('appStore');
    console.log('getting content app');

    switch(app.content) {
      case 'app':
        return <App />
      case 'signup':
        return <Signup />
      case 'login':
      default:
        return <Login app={app} />;
    }
  },

  render: function() {
    return <div>{this.getContent()}</div>;
  }
});

module.exports = Main;
