// preprocessor.js
var ReactTools = require('react-tools');
var nodemodule = "node_modules";
module.exports = {
  process: function(src, file) {
    if (file.indexOf(nodemodule) !== -1) return src;
    return ReactTools.transform(src, {harmony:true});
  }
};
