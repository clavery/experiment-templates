var React = require('react');
var {m}  = require('../util');

module.exports = React.createClass({
  propTypes: {
    todo: React.PropTypes.object
  },

  render: function() {
    var todo = this.props.todo;

    return (
      <li className="list-group-item" style={styles}>
        <span className="badge">
          <span className="glyphicon glyphicon-ok"></span>
        </span>
        <p>Desc: {todo.get('desc')}</p>
      </li>
    );
  }
});

var randomColor = Array(1,2,3).map( () => Math.round(Math.random() * 255) );

var styles = {
  color: `rgb(${randomColor.join(',')})`
};


