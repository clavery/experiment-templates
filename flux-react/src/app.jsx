var React = require('react');
var Director = require('director');

var TodoList = require('./components/todolist');
var TodoStore = require('./stores/todo');

var style = require('./style.scss');

var App = React.createClass({
  getInitialState: function() {
    return {
      count: 10,
      todos: []
    };
  },

  componentDidMount: function() {
    var router = Director.Router({
      '/foo': this.setState.bind(this, {count: 10}),
      '/bar': this.setState.bind(this, {count: 11}),
    });

    router.init('/foo');

    TodoStore.addChangeListener(() => {
      this.setState({ todos: TodoStore.getTodos()});
    });

    TodoStore.fetchTodos();
  },

  render: function() {
    return (
      <div>
        <p><a href='#bar'>URL 1</a> | <a href="#foo">URL 2</a></p>
        <p><b>{this.state.count}</b></p>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
});

//debug
global.React = React;

React.render(<App />, document.body);

