
import { Model, Collection } from 'backbone';

var Todo = Model.extend({
  idAttribute: "_id",
  defaults: {
    desc: ''
  }
});

var Todos = Collection.extend({
  model: Todo,
  url: 'json/todos.json'
});

export {Todo, Todos};
