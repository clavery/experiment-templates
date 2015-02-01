import React from 'react';

import {m} from '../util';

var Bar = React.createClass({
  propTypes: {
    count: React.PropTypes.number,
    style: React.PropTypes.object
  },

  defaultProps: {
    count: 20
  },

  render() {
    var count = this.props.count;

    return (
      <div style={m(
        styles.Count,
        (count % 2 == 0) && styles.Toggled,
        this.props.style
      )}>
        {count}
      </div>
    );
  }
});

var randomColor = Array(1,2,3).map(() => { return Math.round(Math.random() * 255) });

var styles = {
  Count: {
    color: `rgb(${randomColor.join(',')})`,
    fontSize: 24
  },
  Toggled: {
    fontWeight: 'bold',
    fontSize: 30
  }
};

export default Bar
