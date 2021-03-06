var React = require('react/addons');
var {m}  = require('../util');
var {TodoActionCreators} = require('../action_creators');


var TodoItem = React.createClass({
  getInitialState() {
    return {editing: false};
  },

  propTypes: {
    todo: React.PropTypes.object
  },

  _onKeyDown(event) {
    if (event.keyCode === 13) {
      TodoActionCreators.updateTodo(this.props.todo._id, event.target.value);
      this.setState({ editing: false });
    }
  },

  _editTodo() {
    this.setState({ editing: true }, () => {
      this.refs.textInput.getDOMNode().focus();
      this.refs.textInput.getDOMNode().select();
    });
  },

  _removeTodo() {
    TodoActionCreators.deleteTodo(this.props.todo._id);
  },

  render() {
    var todo = this.props.todo;
    var todoBody;

    if (this.state.editing) {
      todoBody = (
        <p>
          <input type="text" ref="textInput" defaultValue={this.props.todo.desc}
            onKeyDown={this._onKeyDown} />
        </p>
      );
    } else {
      todoBody = (
        <p onClick={this._editTodo}>
          {todo.desc}
        </p>
      );
    }

    var badge = (
        <span className="badge">
          <span className="glyphicon glyphicon-remove" onClick={this._removeTodo}></span>
        </span>
    );

    if (this.props.loading) {
      badge = null;
    }

    var classname = this.props.loading ? "list-group-item loading" : "list-group-item";
    return (
      <li className={classname} style={styles}>
        {badge}
        {todoBody}
      </li>
    );
  }
});

var randomColor = Array(1,2,3).map( () => Math.round(Math.random() * 255) );

var styles = {
  color: `rgb(${randomColor.join(',')})`
};


module.exports = TodoItem;
