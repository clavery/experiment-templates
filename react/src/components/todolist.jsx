var React = require('react');
var TodoItem = require('./todoitem');

var TodoList = React.createClass({
  getPropTypes: function() {
    todos: React.PropTypes.object
  },
  render: function() {
    var todos = this.props.todos;

    var todoItems = this.props.todos.map(function (todo) {
      return (
        <TodoItem key={todo.id} todo={todo} />
      );
    });

    return (
      <div>
        <input type="text" />
        <ul className="list-group">
          {todoItems}
        </ul>
      </div>
    );
  }
});

module.exports = TodoList;
