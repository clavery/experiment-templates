import React from 'react';

import {m} from '../util';
import Component from '../component';

import TodoItem from './todoitem';

export default class TodoList extends Component {
  static get propTypes() {
    todos: React.PropTypes.object
  }

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
}

