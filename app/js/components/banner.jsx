var React = require('react');
var Flux = require('delorean').Flux;
var UserActions = require('../actions/user-actions');
var AppActions = require('../actions/app-actions');

var Banner = React.createClass({
  mixins: [Flux.mixins.storeListener],
  
  watchStores: ['appStore'],
  
  propTypes: {
    style: React.PropTypes.string,
    message: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      param: null,
      style: 'info',
      message: '',
    };
  },
  
  componentDidUpdate: function(prevProps) {
    // if the message value changed
    if (!prevProps.message && this.props.message) {
      var app = this.getStore('appStore');
      
      // add a timeout to how long the banner will be displayed
      clearTimeout(this.closeTimeout);
      this.closeTimeout = setTimeout(function(){
        //AppActions.bannerClose();
      }, app.banner_timeout);
    }
  },
  
  componentWillUnmount: function() {
    clearTimeout(this.closeTimeout);
  },
  
  getFormattedMessage: function(message) {
    if (!message) return null;
    
    // this will convert an errors object into a human
    // readable error response for display in the app.
    if (typeof message === 'object') {
      // get the first error
      for(var key in message) break;
      return key.snakeCaseToSentence() + " " + message[key];
      
    }
    return message;
  },
  
  handleClose: function() {
    UserActions.bannerClose();
  },
  
  render: function(){
    var banner, close;
    var app = this.getStore('appStore');
    var message = this.getFormattedMessage(this.props.message);
    var visible = (!this.props.param && !app.banner_param) || (this.props.param && app.banner_param == this.props.param);
    var animation = this.props.animation;
    
    if (!this.props.hide_close) {
      var close = <a className="close" onClick={this.handleClose}><i className="entypo icon icon-cancel"></i></a>
    }

    if (message && visible) {
      return <div className="banner-wrapper">
        <div id="banner" className={"animated banner " + animation + " " + app.banner_style} onClick={this.handleClose}>
          {message}
          {close}
        </div>
      </div>;
    }
    
    return null;
  }
});

module.exports = Banner;
