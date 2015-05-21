var React = require('react');
var style = require('./style.scss');
var App = require('./components/app');

var todos = [
  {id: 1, desc: "item one"},
  {id: 2, desc: "item two"},
  {id: 3, desc: "item three"},
  {id: 4, desc: "item four"}
];

React.render(<App todos={todos} />, document.body);


if (DEBUG) {
  global.React = React;
}
