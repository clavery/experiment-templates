/* @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var style = require('./style.scss');
var routes = require('./routes');
var log = require('./log');

var Promise = require("bluebird");

var previousPromise = null;
Router.run(routes, (Root, state) => {
  var promises = state.routes.filter(function (route) {
    return route.handler.fetchData;
  }).map( (route) => route.handler.fetchData(state.params) );

  if (previousPromise) {
    previousPromise.cancel("cancelled previous waiting promise for new route");
  }

  previousPromise = Promise.all(promises).then( () => {
    log.info("[Router]", "Rendering root route");
    React.render(<Root/>, document.body);
  }).cancellable().catch((reason) => {
    log.info("[Router]", reason);
  });
});

if (DEBUG) {
  global.React = React;
}
