const admin = require('firebase-admin');
const environment = require('../environments/functions-env.prod.json');

admin.initializeApp();

module.exports = { admin, environment };
