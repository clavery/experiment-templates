import React from 'react';
import Director from 'director';

import { BackboneMixin } from './util';
import TodoList from './components/todolist';
import { Todo, Todos } from './models/todo';

import './style.scss';

var todoCollection = new Todos();

var App = React.createClass({
  mixins: [BackboneMixin],

  getBackboneCollections() {
    return [this.props.todoCollection]
  },

  getInitialState () {
    return {count: 10};
  },

  componentDidMount() {
    var router = Director.Router({
      '/foo': this.setState.bind(this, {count: 10}),
      '/bar': this.setState.bind(this, {count: 11}),
    });
    router.init('/foo');
    this.props.todoCollection.fetch();
  },

  render() {
    return (
      <div>
        <TodoList todos={this.props.todoCollection} />
      </div>
    );
  }
});

global.app = function() {
  var body = document.getElementsByTagName('body')[0];

  React.render(<App todoCollection={todoCollection} />, body);
};

//debug
global.React = React;
