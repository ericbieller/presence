var React = require('react/addons');
var Flux = require('delorean').Flux;
var UserStore = require('../stores/user-store');
var UsersStore = require('../stores/users-store');
var Users = require('./users.jsx');
var AppHeader = require('./app-header.jsx');
var UpdatePhoto = require('./update-photo.jsx');
var _ = require('underscore');

var App = React.createClass({
  render: function() {
    var users = UsersStore.items;
    
    // What the hell triggers this twice? Some update being called
    console.log('rendering app');
    
    return (<div>
        <AppHeader />
        <Users items={users} />
      </div>);
  }
});

module.exports = App;