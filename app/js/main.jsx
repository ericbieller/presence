var React = require('react/addons');
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
var AppDispatcher = require('./dispatcher/app-dispatcher');
var Main = require('./components/main.jsx');
var ReactDOM = require("react-dom");
var UserActions = require("./actions/user-actions.js");
var App = require("./components/app.jsx");
var Login = require('./components/login.jsx');

// See if user is already logged in
var token = localStorage.getItem('token');
if (token) {
  UserActions.login(token);
}

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

ReactDOM.render(
  <Main dispatcher={AppDispatcher} />, document.getElementById('main')
);