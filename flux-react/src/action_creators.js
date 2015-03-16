var _ = require('underscore');
var {TodoActionTypes} = require('./constants');
var Dispatcher = require('./dispatcher');
var TodoClient = require('./clients/todo');


exports.TodoActionCreators = {
  fetchAllTodos() {
    Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH);

    TodoClient.fetchTodos().then( (todos) => {
      Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH_SUCCESS, todos);
    }, (error) => {
      Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH_FAILURE, error);
    });
  },

  deleteTodo(id) {
    Dispatcher.dispatch(TodoActionTypes.TODO_DELETE, {_id: id});

    TodoClient.deleteTodo(id).then( (todos) => {
      Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH_SUCCESS, todos);
    }, (error) => {
      Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH_FAILURE, error);
    });
  },

  createTodo(desc) {
    var id = Math.round(Math.random() * 10000);
    var newTodo = {_id: id, desc: desc};
    Dispatcher.dispatch(TodoActionTypes.TODO_CREATE, newTodo);

    TodoClient.createTodo(id, newTodo).then( (todos) => {
      Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH_SUCCESS, todos);
    }, (error) => {
      Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH_FAILURE, error);
    });
  },

  updateTodo(id, desc) {
    var newTodo = {_id: id, desc: desc};
    Dispatcher.dispatch(TodoActionTypes.TODO_UPDATE, newTodo);

    TodoClient.updateTodo(id, newTodo).then( (todos) => {
      Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH_SUCCESS, todos);
    }, (error) => {
      Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH_FAILURE, error);
    });
  }
};

