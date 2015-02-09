var AWS = require('aws-sdk');
var Backbone = require('backbone');

var {AWS_ACCESS_KEY, AWS_SECRET, AWS_BUCKET, AWS_REGION} = require('./aws-config.json');

AWS.config.credentials = new AWS.Credentials(AWS_ACCESS_KEY,AWS_SECRET);
AWS.config.update({region: AWS_REGION});

var bucket = new AWS.S3({params: {Bucket: AWS_BUCKET}});

exports.AWSModel = Backbone.Model.extend({
  sync(method, model, options) {
    console.log(arguments);
    switch(method) {
      case 'update':
      break;
    } 
  }
});

exports.AWSCollection = Backbone.Collection.extend({
  sync(method, model, options) {
    if (!this._results) {
      !this.results = [];
    }

    switch(method) {
      case 'read':
        bucket.getObject({Key: this.url}, function (err, data) {
        if (err) {
          options.error(err);
          return;
        }
        var _rawData = data.Body.toString();
        this.results = JSON.parse(_rawData);
        options.success(this._results);
      });
      break;
    } 
  }
});
