// preprocessor.js
var ReactTools = require('react-tools');
var nodemodule = /node_modules/;
module.exports = {
  process: function(src, file) {
    if (nodemodule.test(file)) return src;
    return ReactTools.transform(src, {harmony:true});
  }
};
