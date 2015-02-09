var React = require('react/addons');
var {m}  = require('../util');
var TodoStore = require('../stores/todo');

var TodoItemEditor = React.createClass({
  _onKeyDown(event) {
    if (event.keyCode === 13) {
      this.props.onSave(event.target.value);
    }
  },

  componentDidMount() {
    this.refs.textInput.getDOMNode().focus();
    this.refs.textInput.getDOMNode().select();
  },

  render() {
    return (
      <p>
        <input type="text" ref="textInput" defaultValue={this.props.todo.get('desc')}
          onKeyDown={this._onKeyDown} />
      </p>
    );
  }
});

var TodoItem = React.createClass({
  getInitialState() {
    return {editing: false};
  },

  propTypes: {
    todo: React.PropTypes.object
  },

  _onSave(newValue) {
    TodoStore.updateTodo(this.props.todo.id, newValue);
    this.setState({ editing: false });
  },

  _editTodo() {
    this.setState({ editing: true });
  },

  render() {
    var todo = this.props.todo;
    var todoBody;

    if (this.state.editing) {
      todoBody = (
        <TodoItemEditor todo={todo} onSave={this._onSave} />
      );
    } else {
      todoBody = (
        <p onClick={this._editTodo}>
          {todo.get('desc')}
        </p>
      );
    }

    return (
      <li className="list-group-item" style={styles}>
        <span className="badge">
          <span className="glyphicon glyphicon-ok"></span>
        </span>
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
