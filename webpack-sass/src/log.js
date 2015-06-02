// simple logger
exports.info = function() {
  if (DEBUG) {
    console.log.apply(console, arguments);
  }
};

exports.warn = function() {
  if (DEBUG) {
    console.warn.apply(console, arguments);
  }
};

exports.error = function() {
  if (console) {
    console.error.apply(console, arguments);
  }
};

