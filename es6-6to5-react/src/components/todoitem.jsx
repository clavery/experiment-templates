
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
      <div style={styles}>
      Desc2: {todo.get('desc')}
      </div>
    );
  }
});

var randomColor = Array(1,2,3).map( () => Math.round(Math.random() * 255) );

var styles = {
  color: `rgb(${randomColor.join(',')})`
};

export default TodoItem

