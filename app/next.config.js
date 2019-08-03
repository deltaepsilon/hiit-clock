const withCss = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withCss(
  withSourceMaps({
    experimental: { publicDirectory: true },
    onDemandEntries: {
      websocketPort: 41000,
    },
  })
);
