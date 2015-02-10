var React = require('react');
var m = require('../util').m;
var TodoStore = require('../stores/todo');
var TodoItem = require('./todoitem');

var TodoList = React.createClass({
  getPropTypes: function() {
    todos: React.PropTypes.object
  },

  createNewTodo(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      TodoStore.createTodo(event.target.value);
      event.target.value = '';
    }
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
        <form>
          <div class="form-group">
            <label>New Todo</label>
            <input type="text" className="form-control" ref="newInput" 
              onKeyDown={this.createNewTodo} />
          </div>
        </form>
        <ul className="list-group">
          {todoItems}
        </ul>
      </div>
    );
  }
});

module.exports = TodoList;
