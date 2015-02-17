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

//debug
global.React = React;

React.render(<App />, document.body);

