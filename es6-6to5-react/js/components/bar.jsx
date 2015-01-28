import React from 'react';

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
      <div>
        Foobar {this.props.initialCount}
      </div>
    );
  }
}
