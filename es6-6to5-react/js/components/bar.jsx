import React from 'react';

import {m} from '../util';

export default class Bar extends React.Component {
  static get propTypes() {
    return {
      count: React.PropTypes.number 
    };
  }

  static get defaultProps() {
    return {
      count: 20
    };
  }

  render() {
    var count = this.props.count;

    return (
      <div style={m(styles.Count, (count % 2 == 0) && styles.Toggled)}>
        Foobar {count}
      </div>
    );
  }
}


var randomColor = Array(1,2,3).map(() => { return Math.round(Math.random() * 255) });

var styles = {
  Count: {
    color: `rgb(${randomColor.join(',')})`,
    fontSize: 24
  },
  Toggled: {
    fontWeight: 'bold'
  }
};
