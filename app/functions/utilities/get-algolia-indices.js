const getAlgoliaClient = require('./get-algolia-client');

module.exports = function getAlgoliaIndices(context) {
  const client = getAlgoliaClient(context);
  const indices = {};

  for (const key in context.environment.algolia.indices) {
    const index = context.environment.algolia.indices[key];

    indices[key] = client.initIndex(index);
  }

  return indices;
};
