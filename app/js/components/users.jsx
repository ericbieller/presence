var React = require('react/addons');
var Flux = require('delorean').Flux;
var UserItem = require('./user-item.jsx');

var Users = React.createClass({
  render: function() {
    var list = [];
    var users = this.props.items;

    for (var key in this.props.items) {
      var userObj = users[key];
      list.push(<UserItem key={userObj.id} item={userObj} />);
    }
    
    return <div className="users">
      {list}
    </div>
  }
});

module.exports = Users;