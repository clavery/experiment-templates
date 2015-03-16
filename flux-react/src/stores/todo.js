var _ = require('underscore');
var {EventEmitter} = require('events');
var assign = require('object-assign');
var Dispatcher = require('../dispatcher');
var {TodoActionTypes} = require('../constants');

var CHANGE_EVENT = 'change';
var todos = [];
var loading = false;
var syncingTodos = {};

var TodoStore = assign({}, EventEmitter.prototype, {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  _emitChange() {
    this.emit(CHANGE_EVENT);
  },

  getAllTodos() {
    return todos;
  },

  isTodoSyncing(id) {
    return !!syncingTodos[id];
  },

  isLoading() {
    return loading;
  }
});
module.exports = TodoStore;

Dispatcher.register(TodoActionTypes.TODOS_FETCH, () => {
  loading = true;
  TodoStore._emitChange();
});

Dispatcher.register(TodoActionTypes.TODOS_FETCH_SUCCESS, (newTodos) => {
  todos = newTodos;
  loading = false;
  syncingTodos = {};
  TodoStore._emitChange();
});

Dispatcher.register(TodoActionTypes.TODO_CREATE, (newTodo) => {
  syncingTodos[newTodo._id] = true;
  todos.push(newTodo);
  TodoStore._emitChange();
});

Dispatcher.register(TodoActionTypes.TODO_DELETE, (id) => {
  syncingTodos[id] = true;
  TodoStore._emitChange();
});

