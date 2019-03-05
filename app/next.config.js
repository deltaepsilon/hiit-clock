const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const copyFile = promisify(fs.copyFile);

module.exports = {
  exportPathMap: async function(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    // console.log('dir, outDir', dir, outDir, distDir);
    // await copyFile(join(dir, 'manifest.json'), join(distDir, 'manifest.json'));

    return defaultPathMap;
  },
  onDemandEntries: {
    websocketPort: 41000,
  },
};
