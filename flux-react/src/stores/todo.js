var {EventEmitter} = require('events');
var assign = require('object-assign');
var Backbone = require('backbone');
var {AWSModel, AWSCollection} = require('../awsbackend');

var CHANGE_EVENT = 'change';

var Todo = AWSModel.extend({
  idAttribute: "_id",
  defaults: {
    desc: ''
  }
});

var TodoCollection = AWSCollection.extend({
  model: Todo,
  url: 'todos.json'
});

var todoCollection = new TodoCollection();


var TodoStore = assign({}, EventEmitter.prototype, {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  fetchTodos() {
    todoCollection.fetch({
      success: () => {
        this.emit(CHANGE_EVENT);
      }
    });
  },

  createTodo(text) {
    var id = Math.round(Math.random() * 10000);
    todoCollection.create({_id: id, desc: text});
    this.emit(CHANGE_EVENT);
  },

  removeTodo(id) {
    var todo = todoCollection.get(id);
    todo.destroy();
    this.emit(CHANGE_EVENT);
  },

  updateTodo(id, text) {
    var todo = todoCollection.get(id);
    todo.set({desc: text});
    // TODO 
    // soft change event
    todo.save();
    this.emit(CHANGE_EVENT);
  },

  getTodos() {
    return todoCollection.models;
  }
});

module.exports = TodoStore;
