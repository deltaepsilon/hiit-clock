const admin = require('firebase-admin');
const environment = require('../environments/functions-env.prod.js');

admin.initializeApp();

module.exports = { admin, environment };
