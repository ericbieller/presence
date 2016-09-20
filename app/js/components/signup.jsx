var React = require('react/addons');
var Flux = require('delorean').Flux;
var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var ReactDOM = require('react-dom')
var AppActions = require('../actions/app-actions.js');
var AuthActions = require('../actions/auth-actions.js');
var Auth = require('../services/auth-service');
var Banner = require('./banner.jsx');

import { Link } from 'react-router'

var Signup = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Flux.mixins.storeListener],
  
  watchStores: ['authStore'],
  
  getInitialState: function() {
    return {
      email: '',
      password: '',
      confirm_password: '',
      name: ''
    };
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
    
    // Check password confirm
    if (this.state.password != this.state.confirm_password) {
      AuthActions.showError("Passwords don't match!");
    } else {
      Auth.signup(this.state.email, this.state.password, this.state.name);
    }
  },
  
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  
  handleConfirmPasswordChange: function(e) {
    this.setState({confirm_password: e.target.value});
  },
  
  handleLogIn: function(e) {
    e.preventDefault();
    AppDispatcher.dispatch('app.show', 'login');
  },
  
  render: function() {
    var email = this.state.email;
    var name = this.state.name;
    var password = this.state.password;
    var confirm_password = this.state.confirm_password;
    var auth = this.getStore('authStore');
    
    if (auth.error) {
      var error = <div className="alert alert-danger">
                    {auth.error}
                  </div>
    }

    return (
      <div className="login-signup">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <div className="well">
                <form role="form">
                  {error}
                  <div className="form-group">
                    <div className="form-group">
                      <input className="form-control" type="text" value={email} onChange={this.handleEmailChange} placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="text" value={name} onChange={this.handleNameChange} placeholder="Your Full Name" />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="password" vaue={password} onChange={this.handlePasswordChange} placeholder="Password" />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="password" vaue={confirm_password} onChange={this.handleConfirmPasswordChange} placeholder="Confirm Password" />
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg" type="submit" onClick={this.handleSubmit}>Sign up!</button>
                </form>
                <div className="secondary-action">Already have an account? <a href="#" onClick={this.handleLogIn}>Log in</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
});

module.exports = Signup;
