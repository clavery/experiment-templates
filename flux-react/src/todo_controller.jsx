var React = require('react');
var TodoList = require('./components/todolist');
var {TodoActionCreators} = require('./action_creators');
var TodoStore = require('./stores/todo');

var TodoController = React.createClass({
  getInitialState: function() {
    return {
      todos: [],
      loading: false
    };
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(() => {
      this.setState({ todos: TodoStore.getTodos()});
      this.setState({ loading: TodoStore.loading});
    });

    TodoActionCreators.fetchAllTodos();
  },

  render: function() {
    return (
      <TodoList todos={this.state.todos} isLoading={this.state.loading} />
    );
  }
});

module.exports = TodoController;
