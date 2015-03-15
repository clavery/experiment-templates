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
    Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH);

    TodoClient.deleteTodo(id).then( (todos) => {
      Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH_SUCCESS, todos);
    }, (error) => {
      Dispatcher.dispatch(TodoActionTypes.TODOS_FETCH_FAILURE, error);
    });
  }
};

