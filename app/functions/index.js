const functions = require('firebase-functions');
const context = require('./utilities/prod-context');

const HealthCheck = require('./src/health-check');
exports.healthCheck = functions.https.onRequest(HealthCheck(context));

const Http = require('./src/http');
exports.http = functions.https.onRequest(Http(context));
