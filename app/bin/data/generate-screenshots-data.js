const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const screenshotsPath = path.join(__dirname, '..', '..', 'public', 'images', 'screenshots');
const destinationFile = path.join(screenshotsPath, 'screenshots.json');

(async () => {
  const imageSuffixes = new Set(['png']);
  const allFiles = await promisify(fs.readdir)(screenshotsPath);
  const imageFiles = allFiles.filter(filename => imageSuffixes.has(filename.split('.').pop()));

  await promisify(fs.writeFile)(destinationFile, JSON.stringify(imageFiles), 'utf8');

  process.exit();
})();
