var {ktov} = require('./util');

exports.ROUTES = {
  TODOS:'todos'
};

exports.TodoActionTypes = ktov({
  TODOS_FETCH:null,
  TODOS_FETCH_SUCCESS:null,
  TODOS_FETCH_FAILURE:null,

  TODO_ADD:null,
  TODO_ADD_SUCCESS:null,
  TODO_ADD_FAILURE:null
});
