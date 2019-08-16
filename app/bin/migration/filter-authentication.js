const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');
const inputFile = path.join(__dirname, 'authentication.csv');
const outputFile = path.join(__dirname, 'authentication-filtered.csv');

(async () => {
  const { data } = await parseFilepath(inputFile);
  const valid = data.filter(record => {
    const googleId = record[7];
    const facebookId = record[11];

    return googleId || facebookId;
  });
  const csvToWrite = Papa.unparse(valid);

  fs.writeFileSync(outputFile, csvToWrite, 'utf8');
})();

async function parseFilepath(inputFile) {
  const readStream = fs.createReadStream(inputFile);

  return new Promise(resolve => {
    Papa.parse(readStream, {
      complete: resolve,
    });
  });
}
