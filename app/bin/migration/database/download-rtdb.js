const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('../../../vault/service-account-2016.json');
const outputFilepath = path.join(__dirname, 'rtdb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://quiver-timer.firebaseio.com',
});

const ref = admin.database().ref('timer/production/user/owned/state');

(async () => {
  const snapshot = await ref
    .once('value');
  const data = snapshot.val();
  const string = JSON.stringify(data);

  fs.writeFileSync(outputFilepath, string, 'utf8');

  console.log('written', outputFilepath);

  process.exit();
})();
