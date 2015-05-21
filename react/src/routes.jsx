var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var {App, Admin} = require('./components/app');

module.exports = (
  <Route handler={App}>
    <Route path="admin" handler={Admin} />
  </Route>
);
