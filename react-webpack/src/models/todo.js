var Backbone = require('backbone');

exports.Todo = Backbone.Model.extend({
  idAttribute: "_id",
  defaults: {
    desc: ''
  }
});

exports.Todos = Backbone.Collection.extend({
  model: exports.Todo,
  url: 'json/todos.json'
});

