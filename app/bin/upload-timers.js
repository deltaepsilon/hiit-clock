const { promisify } = require('util');
const yaml = require('yaml');
const fs = require('fs');
const path = require('path');

const context =
  process.env.NODE_ENV == 'production'
    ? require('../functions/utilities/prod-context')
    : require('../functions/utilities/test-context');
const schema = require('../functions/utilities/schema')(context);

(async () => {
  const filePaths = await getYamlFiles('./data');
  const filesJson = await parseYamlFiles(filePaths);
  const batch = schema.db.batch();

  filesJson.forEach(({ id, ...json }) => {
    const ref = schema.getTimerRef(id);

    batch.set(ref, json);
  });

  await batch.commit();

  console.log(`wrote ${filesJson.length} files`);
})();

async function getYamlFiles(pathToEvaluate, files = []) {
  const filesAndFolder = await promisify(fs.readdir)(pathToEvaluate);

  return filesAndFolder.reduce(
    async (result, name) => {
      let files = await result;
      const isFile = name.match(/yaml/);
      const fullPath = path.join(pathToEvaluate, name);

      if (isFile) {
        files.push(fullPath);
      } else {
        files = await getYamlFiles(fullPath, files);
      }

      return files;
    },
    [...files]
  );
}

async function parseYamlFiles(files) {
  return Promise.all(
    files.map(async file => {
      const text = await promisify(fs.readFile)(file, 'utf8');
      const json = yaml.parse(text);
      const id = file.match(/\/([^/]*)\.yaml/)[1];

      json.id = id.toLowerCase();

      return json;
    })
  );
}
