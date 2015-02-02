import React from 'react';

import {m} from '../util';
import Component from '../component';

export default class TodoItem extends Component {
  static get propTypes() {
    todo: React.PropTypes.object
  }

  render() {
    var todo = this.props.todo;

    return (
      <div style={styles}>
        Desc: {todo.get('desc')}
      </div>
    );
  }
}

var randomColor = Array(1,2,3).map( () => Math.round(Math.random() * 255) );

var styles = {
  color: `rgb(${randomColor.join(',')})`,
};


