var React = require('react/addons');
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
var AppDispatcher = require('./dispatcher/app-dispatcher');
var Main = require('./components/main.jsx');
var ReactDOM = require("react-dom");
var UserActions = require("./actions/user-actions.js");
var App = require("./components/app.jsx");
var Login = require('./components/login.jsx');
var Faces = require('./components/faces.jsx');

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


// Block pages that require authentication
/*const requireAuth = (nextState, replace) => {
  var token = localStorage.getItem('token');

  if (!localStorage.getItem('token')) {
    replace({ pathname: '/' })
  }
}

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="/faces" component={Faces} onEnter={requireAuth} />
  </Route>
)

ReactDOM.render(
  <Router history={browserHistory}>{routes}</Router>, document.getElementById('main')
);*/