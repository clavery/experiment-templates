import React from 'react';
import _ from 'underscore';

export default class Bar extends React.Component {
  static get propTypes() {
    return {
      initialCount: React.PropTypes.number 
    };
  }

  static get defaultProps() {
    return {
      initialCount: 20
    };
  }

  render() {
    return (
      <div style={styles.Bar}>
        Foobar {this.props.initialCount}
      </div>
    );
  }
}

var randomColor = Array(1,2,3).map(() => { return Math.round(Math.random() * 255) });

var styles = {
  Bar: {
    color: `rgb(${randomColor.join(',')})`
  }
};
