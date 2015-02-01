import React from 'react';
import Bar from './components/bar';
import Director from 'director';

import { Model, Collection, LocalStorage } from 'backbone';

var App = React.createClass({
  getInitialState () {
    return {count: 10};
  },

  componentDidMount() {
    var router = Director.Router({
      '/foo': this.setState.bind(this, {count: 10}),
      '/bar': this.setState.bind(this, {count: 11}),
    });
    router.init('/foo');
  },

  render() {
    return (
      <div>
        <Bar count={this.state.count} style={styles} />
      </div>
    );
  }
});

var styles = {
  fontFamily: 'monospace'
};

global.app = function() {
  var body = document.getElementsByTagName('body')[0];

  React.render(<App />, body);
};

//debug
window.React = React;
