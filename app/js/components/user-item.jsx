var React = require('react/addons');
var UserStore = require('../stores/user-store');
var classNames = require('classnames');

var UserItem = React.createClass({
  render: function() {
    
    var statusClasses = classNames(
      this.props.item.idle_status, { 'user-status': true }
    );
    
    return <div className="user">
        <img src={this.props.item.snapshot} />
        <div className={statusClasses}></div>
        <div className="name">{this.props.item.name}</div>
      </div>
  }
});

module.exports = UserItem;