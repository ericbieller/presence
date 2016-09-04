var React = require('react/addons');
var UserStore = require('../stores/user-store');

var UserItem = React.createClass({
  render: function() {
    return (<li className="user">
      <img src={this.props.item.snapshot} />
    <span>{this.props.item.email}</span>
    </li>)
  }
});

module.exports = UserItem;