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

  _onChange() {
    this.setState({
      todos: TodoStore.getAllTodos(),
      loading: TodoStore.isLoading()
    });
  },

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
    TodoActionCreators.fetchAllTodos();
  },

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <TodoList todos={this.state.todos} isLoading={this.state.loading} />
    );
  }
});

module.exports = TodoController;
