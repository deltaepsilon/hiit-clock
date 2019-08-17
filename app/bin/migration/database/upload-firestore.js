const fs = require('fs');
const uuid = require('uuid/v4');
const path = require('path');
const Papa = require('papaparse');
const admin = require('firebase-admin');
const serviceAccount = require('../../../vault/service-account.json');
const rtdbData = require('./rtdb.json');
const authenticationFile = path.join(
  __dirname,
  '..',
  'authentication',
  'authentication-filtered.csv'
);
const outputFile = path.join(__dirname, 'firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://quiver-timer.firebaseio.com',
});

(async () => {
  const { data: authenticationData } = await parseFilepath(authenticationFile);
  const authUids = authenticationData.map(item => item[0]);
  const dataset = reduceAuth({ authUids, rtdbData });
  const firestoreRecords = mapRtdbData(dataset);
  const batchRecords = getBatchJobs(firestoreRecords);

  await writeFirestore(batchRecords);

  console.log('done');
  process.exit();
})();

async function parseFilepath(inputFile) {
  const readStream = fs.createReadStream(inputFile);

  return new Promise(resolve => {
    Papa.parse(readStream, {
      complete: resolve,
    });
  });
}

function reduceAuth({ authUids, rtdbData }) {
  return authUids.reduce((acc, uid) => {
    const userData = rtdbData[uid];
    const userTimers = userData && userData.timers;

    if (userTimers) {
      const result = {
        uid,
        timers: Object.keys(userTimers).map(timerId => {
          const timer = userTimers[timerId];

          return {
            timerId,
            ...timer,
          };
        }),
      };

      acc.push(result);
    }

    return acc;
  }, []);
}

const CHANGE_TIMER_NAME_REGEX = /Change timer name/;
function mapRtdbData(dataset) {
  return dataset.map(({ uid, timers }) => ({
    uid,
    timers: timers
      .filter(
        ({ timerId, name, periods }) =>
          timerId && periods && periods.length && name && !name.match(CHANGE_TIMER_NAME_REGEX)
      )
      .map(({ timerId, ...timer }) => ({
        timerId,
        algolia: {
          name: timer.name,
          totalSeconds: timer.totalSeconds,
          uid,
        },
        index: 'timers',
        isSearchable: !timer.private,
        name: timer.name,
        uid,
        periods: timer.periods
          .filter(({ type }) => type != 'prepare')
          .map(({ name, totalSeconds, type }) => {
            const standardizedType = type == 'rest' ? 'rest' : 'work';

            return {
              name,
              totalSeconds,
              type: standardizedType,
            };
          }),
      })),
  }));
}

function getBatchJobs(records) {
  const db = admin.firestore();

  return records.reduce((acc, { uid, timers }) => {
    timers.forEach(({ timerId, ...timer }) => {
      const timerRef = db
        .collection('users')
        .doc(uid)
        .collection('timers')
        .doc(timerId);

      acc.push([timerRef, timer]);
    });

    return acc;
  }, []);
}

const BATCH_SIZE = 400;
async function writeFirestore(batchRecords) {
  const db = admin.firestore();
  const batch = db.batch();
  const recordsToProcess = batchRecords.slice(0, BATCH_SIZE);
  const recordsToDelay = batchRecords.slice(BATCH_SIZE + 1);

  recordsToProcess.forEach(([ref, record]) => batch.set(ref, record));

  await batch.commit();

  console.log(
    `Processed ${recordsToProcess.length} records. ${recordsToDelay.length} records left to process`
  );

  recordsToDelay.length && await writeFirestore(recordsToDelay);
}
