var React = require('react');
var TodoList = require('./todolist');

var App = React.createClass({
  componentDidMount: function() {
  },
  render: function() {
    return (
      <div>
        <TodoList todos={this.props.todos} />
      </div>
    );
  }
});

module.exports = App;
