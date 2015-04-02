var React = require('react');
var App = require('./app');

var style = require('./style.scss');

// render app (router component) into page
React.render(React.createElement(App), document.body);


// register objects into window for debugging
if (DEBUG) {
  global.React = React;
  global.Dispatcher = require('./dispatcher');
  global.TodoClient = require('./clients/todo');
  global.TodoStore = require('./stores/todo');
  var {TodoActionCreators} = require('./actions');
  global.TodoActionCreators = TodoActionCreators;
}


