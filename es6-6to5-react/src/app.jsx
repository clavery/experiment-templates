import React from 'react';
import Director from 'director';

import { BackboneMixin } from './util';
import { Todo, Todos } from './models/todo';
import TodoList from './components/todolist';
import Component from './component';

import './style.scss';

var todoCollection = new Todos();

class App extends Component {
  static get mixins() {
    return [BackboneMixin]
  }

  getInitialState() {
    return {count: 10};
  }

  getBackboneCollections() {
    return [this.props.todoCollection]
  }

  componentDidMount() {
    var router = Director.Router({
      '/foo': this.setState.bind(this, {count: 10}),
      '/bar': this.setState.bind(this, {count: 11}),
    });

    router.init('/foo');
    this.props.todoCollection.fetch();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <span>{this.state.count}</span>
        <TodoList todos={this.props.todoCollection} />
      </div>
    );
  }
}

global.app = function() {
  var body = document.getElementsByTagName('body')[0];

  React.render(<App todoCollection={todoCollection} />, body);
};

//debug
global.React = React;
