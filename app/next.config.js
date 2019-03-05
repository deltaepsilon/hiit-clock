const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const copyFile = promisify(fs.copyFile);

module.exports = {
  exportPathMap: async function(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    await copyFile(join(dir, 'root', 'sw.js'), join(distDir, 'sw.js'));
    await copyFile(join(dir, 'root', 'robots.txt'), join(distDir, 'robots.txt'));

    return defaultPathMap;
  },
  onDemandEntries: {
    websocketPort: 41000,
  },
};
