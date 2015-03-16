var {ktov} = require('./util');

exports.ROUTES = {
  TODOS:'todos'
};

exports.TodoActionTypes = ktov({
  TODOS_FETCH:null,
  TODOS_FETCH_SUCCESS:null,
  TODOS_FETCH_FAILURE:null,


  TODO_CREATE:null,
  TODO_UPDATE:null,
  TODO_DELETE: null,
});
