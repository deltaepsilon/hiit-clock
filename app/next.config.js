const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const copyFile = promisify(fs.copyFile);
const readdir = promisify(fs.readdir);
const replace = require('replace-in-file');
const withCss = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps');

async function exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
  const rootDir = join(dir, 'root');
  const files = await readdir(rootDir);
  const promises = files.map(async file => {
    const filePath = join(rootDir, file);
    const files = [];
    const hasDistDir = !!distDir;
    const hasOutDir = !!outDir;

    if (hasDistDir) {
      const distPath = join(distDir, file);

      files.push(distPath);

      await copyFile(filePath, distPath);
    }

    if (hasOutDir) {
      const outPath = !!outDir && join(outDir, file);

      files.push(outPath);

      await copyFile(filePath, outPath);
    }

    const changes = await replace({
      files: files,
      from: 'BUILD_ID',
      to: buildId,
    });

    return changes;
  });

  const changes = await Promise.all(promises);

  console.log('changes', changes);

  return defaultPathMap;
}

module.exports = withCss(
  withSourceMaps({
    exportPathMap,
    onDemandEntries: {
      websocketPort: 41000,
    },
  })
);
