import _ from 'underscore';

/**
 * Return a new object merging all truthy arguments
 *
 * @returns {object}
 */
function m() {
  var res = {};
  for (var i=0; i < arguments.length; i++) {
    if (arguments[i]) {
      _.extend(res, arguments[i]);
    }
  }
  return res;
}

export {m}
