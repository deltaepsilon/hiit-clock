const express = require('express');
const context = require('../utilities/prod-context');
const Http = require('../src/http');
const app = express();
const port = 4000;
const mountPoint = '/http'

app.use(mountPoint, Http(context));
app.listen(port, '0.0.0.0', () => {
  console.info(`mounting on ${mountPoint}; listening on port ${port}`);
});
