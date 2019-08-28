const algoliasearch = require('algoliasearch');

module.exports = function getAlgoliaClient(context) {
  const { applicationId, apiKey } = context.environment.algolia;
  const client = algoliasearch(applicationId, apiKey);

  return client;
};
