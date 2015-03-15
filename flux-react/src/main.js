var React = require('react');
var style = require('./style.scss');
var App = require('./app');

// render app (router component) into page
React.render(React.createElement(App), document.body);

// register objects into window for debugging
if (DEBUG) {
  global.React = React;
  global.Dispatcher = require('./dispatcher');
}


