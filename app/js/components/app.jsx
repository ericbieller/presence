var React = require('react/addons');
var Flux = require('delorean').Flux;
var UserStore = require('../stores/user-store');
var UsersStore = require('../stores/users-store');
var Users = require('./users.jsx');
var AppHeader = require('./app-header.jsx');
var UpdatePhoto = require('./update-photo.jsx');
var Banner = require('./banner.jsx');
var UserActions = require("../actions/user-actions.js");
var _ = require('underscore');

var App = React.createClass({
  render: function() {
    var users = UsersStore.items;
    
    return (<div>
        <AppHeader />
        <Users items={users} />
      </div>);
  },
  
  componentDidMount: function() {
    // Setup event for tracking user's system idle status
    addEventListener('update-status', function(e) {
      var current_user = UsersStore.getCurrentUser();
      UserActions.updateIdleStatus({user_id: current_user.id, idle_status: e.detail.idle_status});
    });
    
    addEventListener('received-answer', function(e) {
      console.log('answer received: ' + e.detail.answer)
      UserActions.sendCallResponse(e.detail);
    });
  }
});

module.exports = App;
