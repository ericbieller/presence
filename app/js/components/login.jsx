var React = require('react/addons');
var ReactDOM = require('react-dom')
var AppActions = require('../actions/app-actions.js');
var Auth = require('../services/auth-service');
var GoogleLogin = require('react-google-login');
import { Link } from 'react-router'

var Login = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState: function() {
    return {
      email: '',
      password: ''
    };
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
    Auth.login(this.state.email, this.state.password);
  },
  
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  
  render: function() {
    var email = this.state.email;
    var password = this.state.password;

    return (
      <div>
      <Link to="faces">Login route</Link>
      <form role="form">
        <div className="form-group">
          <input type="text" value={email} onChange={this.handleEmailChange} placeholder="Email" />
          <input type="password" vaue={password} onChange={this.handlePasswordChange} placeholder="Password" />
        </div>
        <button type="submit" onClick={this.handleSubmit}>Submit</button>
      </form>
      </div>);
  }
});

module.exports = Login;
