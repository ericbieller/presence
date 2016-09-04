var React = require('react/addons');
var Webcam = require('webcamjs');
var UpdatePhoto = require('./update-photo.jsx');
var UserActions = require('../actions/user-actions');

var AppHeader = React.createClass({
  handleLogout: function(e) {
    e.preventDefault();
    UserActions.logout();
  },
  
  render: function() {
    return (<div className="navbar navbar-default">    
              <UpdatePhoto />
              <a href="..." className="logout" onClick={this.handleLogout}>Logout</a>
            </div>);
  }
});

module.exports = AppHeader;

