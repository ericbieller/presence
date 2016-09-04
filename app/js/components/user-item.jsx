var React = require('react/addons');
var UserStore = require('../stores/user-store');

var UserItem = React.createClass({
  render: function() {
    return <div className="user">
        <img src={this.props.item.snapshot} />
        <div className="user-status"></div>
        <div className="name">{this.props.item.name}</div>
      </div>
  }
});

module.exports = UserItem;