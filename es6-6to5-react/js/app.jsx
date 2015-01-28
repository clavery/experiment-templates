import React from 'react';
import Bar from './components/bar';
import _ from 'underscore';
import Director from 'director';

import { Model, Collection, LocalStorage } from 'backbone';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      count: 10
    };
  }

  componentDidMount() {
    var router = Director.Router({
      '/foo': this.setState.bind(this, {count: 10}),
      '/bar': this.setState.bind(this, {count: 30}),
    });
    router.init('/foo');
  }

  render() {
    return (
      <div>
        <Bar initialCount={this.state.count} />
      </div>
    );
  }
}


global.app = function() {
  var body = document.getElementsByTagName('body')[0];

  React.render(<App />, body);
};

//debug
global.React = React;
