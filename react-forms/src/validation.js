
module.exports = {
  Required(msg) {
    return (name, input) => {
      if (!input || input.length === 0) {
        return msg ? msg : `${name} is required`;
      }
    };
  },

  MinLength(len, msg) {
    return (name, input) => {
      if (input && input.length < len) {
        return msg ? msg : `${name} must be at least ${len} characters long`;
      }
    };
  }
};
