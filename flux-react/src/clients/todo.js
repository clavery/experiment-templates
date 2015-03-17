// nastiness because aws-sdk hates webpack
var AWS = require('exports?AWS!aws-sdk');
var _ = require('underscore');
var Promise = require('es6-promise').Promise;

var {AWS_ACCESS_KEY, AWS_SECRET, AWS_BUCKET, AWS_REGION, KEY} = require('../../aws-config.json');

AWS.config.credentials = new AWS.Credentials(AWS_ACCESS_KEY,AWS_SECRET);
AWS.config.update({region: AWS_REGION});

var bucket = new AWS.S3({params: {Bucket: AWS_BUCKET}});

function loadJSON(key, success, error) {
  bucket.getObject({Key: key}, (err, data) => {
    if (err) {
      error(err);
      return;
    }
    var _rawData = data.Body.toString();
    var results = JSON.parse(_rawData);
    success(results);
  });
}

function saveJSON(key, data, success, error) {
  var _data = JSON.stringify(data);
  bucket.putObject({Key: key, Body: _data}, (err, d) => {
    if (err) {
      error(err);
      return;
    }
    success(data);
  });
}

function copy(src) {
  return _.map(src, (o) => _.extend({}, o));
}

// store entire state in memory for syncing
var cache = [];

var TodoClient = {
  fetchTodos() {
    return new Promise(function(resolve, reject) {
      loadJSON(KEY, (data) => {
        cache = data;
        resolve(copy(cache));
      }, (error) => {
        reject(error);
      });
    });
  },

  createTodo(id, data) {
    return new Promise(function(resolve, reject) {
      cache.push(_.extend({}, data));

      saveJSON(KEY, cache, (data) => {
        resolve(copy(cache));
      }, (error) => {
        reject(error);
      });
    });
  },

  deleteTodo(id) {
    return new Promise(function(resolve, reject) {
      var item = _.findWhere(cache, {_id:id});
      if (item) {
        cache.splice(cache.indexOf(item), 1);
        saveJSON(KEY, cache, (data) => {
          resolve(copy(cache));
        }, (error) => {
          reject(error);
        });
      } else {
        resolve(copy(cache));
      }
    });
  },

  updateTodo(id, data) {
    return new Promise(function(resolve, reject) {
      var item = _.findWhere(cache, {_id:id});
      _.extend(item, data);
      saveJSON(KEY, cache, (data) => {
        resolve(copy(cache));
      }, (error) => {
        reject(error);
      });
    });
  }
};

module.exports = TodoClient;
