var _ = require('underscore');
var Promise = require('es6-promise').Promise;

var KEY = 'todos';

function loadJSON(key) {
  var item = localStorage.getItem(key);
  if (!item) {
    return [];
  }
  return JSON.parse(item);
}

function saveJSON(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function copy(src) {
  return _.map(src, (o) => _.extend({}, o));
}

// store entire state in memory for syncing
var cache = [];

var TodoClient = {
  fetchTodos() {
    return new Promise(function(resolve, reject) {
      cache = loadJSON(KEY);
      resolve(copy(cache));
    });
  },

  createTodo(id, data) {
    return new Promise(function(resolve, reject) {
      cache.push(_.extend({}, data));
      saveJSON(KEY, cache);
      // artificial slowness
      setTimeout(() => {
        resolve(copy(cache));
      }, 1000);
    });
  },

  deleteTodo(id) {
    return new Promise(function(resolve, reject) {
      var item = _.findWhere(cache, {_id:id});
      if (item) {
        cache.splice(cache.indexOf(item), 1);
        saveJSON(KEY, cache);
        resolve(copy(cache));
      } else {
        resolve(copy(cache));
      }
    });
  },

  updateTodo(id, data) {
    return new Promise(function(resolve, reject) {
      var item = _.findWhere(cache, {_id:id});
      _.extend(item, data);
      saveJSON(KEY, cache);
      resolve(copy(cache));
    });
  }
};

module.exports = TodoClient;
