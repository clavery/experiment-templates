
import React from 'react';

import {m} from '../util';

import TodoItem from './todoitem';

var TodoList = React.createClass({
  propTypes: {
    todos: React.PropTypes.object
  },

  render() {
    var todos = this.props.todos;

    var todoItems = this.props.todos.map(function (todo) {
      return (
        <TodoItem key={todo.id} todo={todo} />
      );
    });

    return (
      <div>
        {todoItems}
      </div>
    );
  }
});

export default TodoList
