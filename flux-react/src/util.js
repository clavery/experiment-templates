var _ = require('underscore');

/**
 * Return a new object merging all truthy arguments
 *
 * @returns {object}
 */
exports.m = function m() {
  var res = {};
  for (var i=0; i < arguments.length; i++) {
    if (arguments[i]) {
      _.extend(res, arguments[i]);
    }
  }
  return res;
}

/**
 * Keys To Values (ktov)
 *
 * Sets the values of all properties of an object to it's key name
 *
 * @param obj {object} Source Object
 * @returns {object}
 */
exports.ktov = function keysToValues(obj) {
  var newObj = {};
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      newObj[k] = k;
    }
  }
  return newObj;
}

