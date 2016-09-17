var React = require('react/addons');
var Flux = require('delorean').Flux;
var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var ReactDOM = require('react-dom')
var AppActions = require('../actions/app-actions.js');
var Auth = require('../services/auth-service');
var Banner = require('./banner.jsx');

import { Link } from 'react-router'

var Signup = React.createClass({
  mixins: [React.addons.LinkedStateMixin, Flux.mixins.storeListener],
  
  watchStores: ['authStore'],
  
  getInitialState: function() {
    return {
      email: '',
      password: ''
    };
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
  },
  
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
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
    var password = this.state.password;
    var confirm_password = this.state.confirm_password;
    //var auth = this.getStore('authStore');
    
    /*if (auth.error) {
      var error = <div className="alert alert-danger">
                    {auth.error}
                  </div>
    }*/

    return (
      <div className="login-signup">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <div className="well">
                <form role="form">
                  <div className="form-group">
                    <div className="form-group">
                      <input className="form-control" type="text" value={email} onChange={this.handleEmailChange} placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="password" vaue={password} onChange={this.handlePasswordChange} placeholder="Password" />
                    </div>
                    <div className="form-group">
                      <input className="form-control" type="password" vaue={confirm_password} onChange={this.handleConfirmPasswordChange} placeholder="Confirm Password" />
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg" type="submit" onClick={this.handleSubmit}>Submit</button>
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
