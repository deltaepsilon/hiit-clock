const admin = require('firebase-admin');
const environment = require('../environments/environment-prod.json');

admin.initializeApp();

module.exports = { admin, environment };
