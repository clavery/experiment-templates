var React = require('react/addons');
var {m}  = require('../util');

var TodoItem = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {value: 'Hello!'};
  },

  propTypes: {
    todo: React.PropTypes.object
  },

  render: function() {
    var todo = this.props.todo;
    var val = this.state.value;

    return (
      <li className="list-group-item" style={styles}>
        <span className="badge">
          <span className="glyphicon glyphicon-ok"></span>
        </span>
        <p>Desc: {todo.get('desc')} {val}</p>
        <input type="text" valueLink={this.linkState('value')} />
      </li>
    );
  }
});

var randomColor = Array(1,2,3).map( () => Math.round(Math.random() * 255) );

var styles = {
  color: `rgb(${randomColor.join(',')})`
};


module.exports = TodoItem;
