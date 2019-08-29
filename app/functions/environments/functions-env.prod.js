const functions = require('firebase-functions');
let config = functions.config();

if (!config.algolia) {
  config.algolia = { admin_api_key: process.env.ALGOLIA_PRIVATE_API_KEY };
}

module.exports = {
  algolia: {
    apiKey: config.algolia.admin_api_key,
    applicationId: 'TO2F04TXTS',
    indices: { timers: 'hiit-clock-prod-2019:timers' },
  },
  environment: process.env.NODE_ENV,
  firebase: {
    databaseURL: 'https://quiver-hiit-clock.firebaseio.com',
  },
};
