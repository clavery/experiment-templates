var React = require('react');
var Director = require('director');

var m = require('./util').m;
var BackboneMixin = require('./util').BackboneMixin;
var {Todo, Todos} = require('./models/todo');
var TodoList = require('./components/todolist');


var style = require('./style.scss');
var todoCollection = new Todos();


var App = React.createClass({
  mixins: [BackboneMixin],
  getInitialState: function() {
    return {count: 10};
  },
  getBackboneCollections: function() {
    return [this.props.todoCollection]
  },
  componentDidMount: function() {
    var router = Director.Router({
      '/foo': this.setState.bind(this, {count: 10}),
      '/bar': this.setState.bind(this, {count: 11}),
    });

    router.init('/foo');
    this.props.todoCollection.fetch();
  },
  render: function() {
    return (
      <div>
        <TodoList todos={this.props.todoCollection} />
      </div>
    );
  }
});


global.app = function() {
  React.render(<App todoCollection={todoCollection} />, document.body);
};

//debug
global.React = React;
