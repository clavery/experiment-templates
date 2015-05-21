
var handlers = {};

var Dispatcher = {
  dispatch(actionName, payload) {
    if (DEBUG && !actionName) {
      console.error("[DISPATCHER] Can't dispatch undefined action");
      return;
    } else if (DEBUG) {
      console.log('[DISPATCHER] Dispatching', actionName);
    }

    if (handlers[actionName]) {
      handlers[actionName].forEach( (cb) => {
        cb(payload);
      });
    } else if(DEBUG) {
      console.warn('[DISPATCHER] No callbacks registered for', actionName);
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
