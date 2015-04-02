var React = require('react');
var request = require('superagent');

var {Foo} = require('./components');

var App = React.createClass({
  getInitialState: function() {
    var initialData = window && window.initialState ? window.initialState : [];
    return {
      data: initialData
    };
  },

  componentDidMount: function() {
    request.get('/json/todos.json', (res) => {
      this.setState({data:res.body});
    });
  },

  render: function() {
    return (
      <Foo data={this.state.data} />
    );
  }
});

var Router = React.createClass({
  getInitialState: function() {
    return {
      url: '/'
    };
  },

  componentDidMount: function() {
    var router = new director.Router({
      '/': this.setState.bind(this, { url: '/'}),
      '/somethingelse' : this.setState.bind(this, { url: '/'})
    });
  },

  render: function() {
    switch (this.state.url) {
      case '/':
        return ( <MainView /> );
      break;
      case '/somethingelse':
        return ( <SomeOtherView /> );
      break;
    }
  }
});
//debug
global.React = React;

React.render(<App />, document.body);

