var AWS = require('aws-sdk');
var Backbone = require('backbone');
var _ = require('underscore');

var {AWS_ACCESS_KEY, AWS_SECRET, AWS_BUCKET, AWS_REGION} = require('../aws-config.json');

AWS.config.credentials = new AWS.Credentials(AWS_ACCESS_KEY,AWS_SECRET);
AWS.config.update({region: AWS_REGION});

var bucket = new AWS.S3({params: {Bucket: AWS_BUCKET}});

var _cache = {};

function loadFullSet(key, success, error) {
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

function saveFullSet(key, data, success, error) {
  var _data = JSON.stringify(data);
  bucket.putObject({Key: key, Body: _data}, (err, d) => {
    if (err) {
      error(err);
      return;
    }
    success(data);
  });
}

function ensureCacheKey(key) {
  if (!_cache[key]) {
    _cache[key] = [];
  }
}

exports.AWSModel = Backbone.Model.extend({
  sync(method, model, options) {
    var url = this.collection.url;
    ensureCacheKey(url);

    var rawModel = _.findWhere(_cache[url], {'_id': model.id});

    if (!rawModel) {
      _cache[url].push(_.clone(model.attributes));
    }

    if (method === 'update') {
      _.extend(rawModel, model.attributes);
    } else if(method === 'delete') {
      var idx = _cache[url].indexOf(rawModel);
      _cache[url].splice(idx, 1);
    } 

    if(method === 'read') {
      setTimeout(() => options.success(rawModel), 0);
    } else {
      saveFullSet(url, _cache[url], (data) => {
        options.success(_.clone(rawModel));
      }, (err) => {
        options.error(err);
      });
    }
  }
});

exports.AWSCollection = Backbone.Collection.extend({
  sync(method, collection, options) {
    var url = this.url;
    ensureCacheKey(this.url);

    if (method === 'read') {
      loadFullSet(url, (results) => {
        _cache[url] = _.clone(results);
        options.success(results);
      }, (err) => {
        options.error(err);
      });
    } else if (method === 'create') {
      _cache[url] = _.clone(collection.models);
      saveFullSet(url, collection.models, (data) => {
        options.success(collection.models);
      }, (err) => {
        options.error(err);
      });
    }
  }
});
