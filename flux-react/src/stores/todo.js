var {EventEmitter} = require('events');
var assign = require('object-assign');
var Dispatcher = require('../dispatcher');
var {TodoActionTypes} = require('../constants');

var CHANGE_EVENT = 'change';

var TodoStore = assign({}, EventEmitter.prototype, {
  loading : false,
  todos : [],

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  _registerWithDispatcher() {
    Dispatcher.register(TodoActionTypes.TODOS_FETCH, this._loadingTodos.bind(this));
    Dispatcher.register(TodoActionTypes.TODOS_FETCH_SUCCESS, this._todosLoaded.bind(this));
  },

  _loadingTodos() {
    this.loading = true;
    this.emit(CHANGE_EVENT);
  },

  _todosLoaded(todos) {
    this.loading = false;
    this.todos = todos;
    this.emit(CHANGE_EVENT);
  },

  getTodos() {
    return this.todos;
  }
});

TodoStore._registerWithDispatcher();

module.exports = TodoStore;
