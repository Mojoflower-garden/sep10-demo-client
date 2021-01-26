module.exports = function (environment) {
  return {
    delivery: ['meta'],
    policy: {
      'connect-src': ["'self'", 'http://*', 'https://*'],
    },
  };
};
