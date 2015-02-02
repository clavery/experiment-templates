import _ from 'underscore';


var BackboneMixin = {
  componentDidMount: function () {
    this.getBackboneCollections().forEach(function (collection) {
      collection.on('add remove change', this.forceUpdate.bind(this, null));
    }, this);
  },
  componentWillUnmount: function () {
    this.getBackboneCollections().forEach(function (collection) {
      collection.off(null, null, this);
    }, this);
  }
};

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

export {m, BackboneMixin }
