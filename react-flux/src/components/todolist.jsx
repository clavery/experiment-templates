var React = require('react');
var m = require('../util').m;
var TodoItem = require('./todoitem');
var TodoStore = require('../stores/todo');
var {TodoActionCreators} = require('../action_creators');

var TodoList = React.createClass({
  getPropTypes: function() {
    todos: React.PropTypes.object
  },

  createNewTodo(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      TodoActionCreators.createTodo(event.target.value);
      event.target.value = '';
    }
  },

  render: function() {
    var todos = this.props.todos;

    var todoItems = this.props.todos.map(function (todo) {
      return (
        <TodoItem key={todo._id} todo={todo} loading={TodoStore.isTodoSyncing(todo._id)}/>
      );
    });

    var classes = "";
    if (this.props.isLoading) {
      classes = "list-loading";
    }

    return (
      <div className={classes}>
        <form>
          <div className="form-group">
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
