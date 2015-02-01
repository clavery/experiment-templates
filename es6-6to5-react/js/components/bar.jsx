import React from 'react';
import _ from 'underscore';

import BarStyle from '../styles/bar.js';

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
      <div style={BarStyle.Count}>
        Foobar {this.props.initialCount}
      </div>
    );
  }
}
