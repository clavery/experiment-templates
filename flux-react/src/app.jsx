var React = require('react');
var Director = require('director');
var TodoController = require('./todo_controller');
var _ = require('underscore');
var {ROUTES} = require('./constants');


var App = React.createClass({
  getInitialState: function() {
    return {
      ROUTE: ROUTES.TODOS,
      todos: []
    };
  },

  componentDidMount: function() {
    var routeHandlers = {};
    _.each(ROUTES, (route, routeName) => {
      routeHandlers[routeName] = this.setState.bind(this, ROUTES[routeName]);
    });
    var router = Director.Router(routeHandlers);

    // default route
    router.init(ROUTES.TODOS);
  },

  render: function() {
    switch (this.state.ROUTE) {
      case ROUTES.TODOS:
        return (
          <TodoController />
        );
      break;
    }
  }
});

module.exports = App;
