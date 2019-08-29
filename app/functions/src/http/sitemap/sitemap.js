const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const getAlgoliaIndices = require('../../../utilities/get-algolia-indices');

module.exports = context => async (req, res) => {
  const { timers: timersIndex } = getAlgoliaIndices(context);
  const sitemapText = await getSitemapText();
  const lines = sitemapText.split('\n');
  const records = await getAllRecordsFromIndex(timersIndex);
  const allLines = addRecordsToLines({ lines, records });
  const sitemap = allLines.join('\n');
  const headers = { 'Content-Type': 'text/plain' };

  res
    .set(headers)
    .status(200)
    .send(sitemap);

  console.info(`origin: ${req.get('origin')}; length: ${allLines.length}`);
};

async function getAllRecordsFromIndex(index) {
  return new Promise((resolve, reject) => {
    const browser = index.browseAll();
    let results = [];

    browser.on('result', content => {
      results = results.concat(content.hits);
    });

    browser.on('end', () => {
      resolve(results);
    });

    browser.on('error', error => {
      reject(error);
    });
  });
}

function getSitemapText() {
  const filepath = path.join(__dirname, 'sitemap.txt');

  return promisify(fs.readFile)(filepath, 'utf8');
}

function addRecordsToLines({ lines, records }) {
  const [root] = lines;
  const timerLines = records
    .filter(({ objectID, uid, totalSeconds }) => {
      return objectID != 'undefined' && uid && totalSeconds > 0;
    })
    .map(({ objectID, uid }) => `${root}timer?id=${objectID}&userId=${uid}`);

  return [...lines, ...timerLines];
}
