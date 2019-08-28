module.exports = {
  algolia: {
    apiKey: process.env._ALGOLIA_PRIVATE_API_KEY,
    applicationId: 'TO2F04TXTS',
    indices: { timers: 'hiit-clock-test-2019:timers' },
  },
  environment: process.env.NODE_ENV,
  firebase: {
    databaseURL: 'https://quiver-hiit-clock.firebaseio.com',
  },
};
