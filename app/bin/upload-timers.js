const { promisify } = require('util');
const yaml = require('yaml');
const fs = require('fs');
const path = require('path');

const context =
  process.env.NODE_ENV == 'production'
    ? require('../functions/utilities/prod-context')
    : require('../functions/utilities/test-context');
const schema = require('../functions/utilities/schema')(context);
const uid = 'shared-user';

(async () => {
  const filePaths = await getYamlFiles('./data');
  const filesJson = await parseYamlFiles(filePaths);
  const batch = schema.db.batch();
  const updated = Date.now();

  filesJson.forEach(({ __id, ...json }) => {
    const ref = schema.getUserTimerRef(uid, __id);

    batch.set(ref, {
      ...json,
      updated,
      index: 'timers',
      algolia: {
        uid,
        name: json.name,
        tags: json.tags,
        totalSeconds: json.periods.reduce((result, { totalSeconds }) => totalSeconds + result, 0),
      },
    });
  });

  await batch.commit();

  await saveJson(filesJson);

  console.info(`wrote ${filesJson.length} files`);
})();

async function getYamlFiles(pathToEvaluate, files = []) {
  const filesAndFolder = await promisify(fs.readdir)(pathToEvaluate);

  return filesAndFolder.reduce(
    async (result, name) => {
      let files = await result;
      const isFile = name.match(/yaml/);
      const isDirectory = !name.match(/\./);
      const fullPath = path.join(pathToEvaluate, name);

      if (isFile) {
        files.push(fullPath);
      } else if (isDirectory) {
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
      const __id = file.match(/\/([^/]*)\.yaml/)[1];

      json.__id = __id.toLowerCase();
      json.__uid = uid;

      return json;
    })
  );
}

async function saveJson(filesJson) {
  const filesJsonByTag = filesJson.reduce((result, file) => {
    const tags = file.tags;

    tags.forEach(properCaseTag => {
      const tag = properCaseTag.toLowerCase();

      if (!result[tag]) {
        result[tag] = [];
      }

      result[tag].push(file);
    });

    return result;
  }, {});

  for (const tag in filesJsonByTag) {
    const json = filesJsonByTag[tag];
    const filepath = path.join(__dirname, '..', 'data', `${tag}.json`);

    await promisify(fs.writeFile)(filepath, JSON.stringify(json), 'utf8');
  }
}
