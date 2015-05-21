var React = require('react');
var TodoList = require('./todolist');
var {RouteHandler} = require('react-router');

var Promise = require("bluebird");

var Admin = React.createClass({
  statics: {
    fetchData: function (params) {
      console.log("fetchData", arguments);
      return new Promise( (resolve) => {
        setTimeout(() => {
          console.log("fetchData done")
          resolve();
        }, 10000);
      });
    }
  },
  render() {
    return <h1>Admin</h1>
  }
});

var App = React.createClass({
  componentDidMount() {
  },
  render() {
    console.log("Rendering app");
    return (
      <div>
        <h1>My App</h1>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = {
  App,
  Admin
}
