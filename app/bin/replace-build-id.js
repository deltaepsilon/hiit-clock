const fs = require('fs');
const path = require('path');
const util = require('util');
const replace = require('replace-in-file');
const buildId = new Date().toString();
const buildDirectory = path.join(__dirname, '..', 'out');
const readdir = util.promisify(fs.readdir);

(async () => {
  const files = await readdir(buildDirectory);
  const filePaths = files
    .filter(file => file.match(/\./))
    .map(file => path.join(buildDirectory, file));

  const changes = await replace({
    files: filePaths,
    from: 'BUILD_ID',
    to: buildId,
  });

  console.log({ buildId, changes });
})();
