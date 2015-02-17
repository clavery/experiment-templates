var React = require("react");
var Foo = React.createClass({
  render: function() {
    if (!this.props.data || this.props.data.length === 0) {
      return (
        <span>No data</span>
      );
    } else {
      var todos = this.props.data.map(function(todo) {
        return (
          <li>{todo.desc}</li>
        );
      });

      return (
        <ul>
          {todos}
        </ul>
      );
    }
  }
});

exports.Foo = Foo;
