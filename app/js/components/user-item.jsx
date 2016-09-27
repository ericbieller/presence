var React = require('react/addons');
var UserStore = require('../stores/user-store');
var UsersStore = require('../stores/users-store');
var Calls = require('../services/calls-service');
var classNames = require('classnames');

var UserItem = React.createClass({
  createCall: function() {
    var caller = UsersStore.getCurrentUser();
    var callee = UsersStore.getUser(this.props.item.id);
    
    Calls.create({
      caller: {
        id: caller.id,
        name: caller.name
      },
      callee: {
        id: callee.id,
        name: callee.name
      }
    })
  },
  
  render: function() {
    var callButton;
    
    var statusClasses = classNames(
      this.props.item.idle_status, { 'user-status': true }
    );
    
    if (!this.props.item.me) {
      callButton = <a onClick={this.createCall}>Call</a>
    }
    
    return <div className="user">
        {callButton}
        <img src={this.props.item.snapshot} />
        <div className={statusClasses}></div>
        <div className="name">{this.props.item.name}</div>
      </div>
  }
});

module.exports = UserItem;