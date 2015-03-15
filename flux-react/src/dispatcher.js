
var handlers = {};

var Dispatcher = {
  dispatch(actionName, payload) {
    if (DEBUG) {
      console.log(`[DISPATCHER] Dispatching ${actionName}`);
    }

    if (handlers[actionName]) {
      handlers[actionName].forEach( (cb) => {
        cb(payload);
      });
    }
  },

  register(actionName, cb) {
    if (!handlers[actionName]) {
      handlers[actionName] = [];
    }
    handlers[actionName].push(cb);
  }
};

module.exports = Dispatcher;
