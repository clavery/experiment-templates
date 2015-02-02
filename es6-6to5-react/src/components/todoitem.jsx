
import React from 'react';

import {m} from '../util';

import TodoItem from './todoitem';

var TodoItem = React.createClass({
  propTypes: {
    todo: React.PropTypes.object
  },

  render() {
    var todo = this.props.todo;

    return (
      <div>
      {todo.get('desc')}
      </div>
    );
  }
});

export default TodoItem

