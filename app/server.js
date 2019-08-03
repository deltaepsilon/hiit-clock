const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const environment = require('./environments/app-env.dev');

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname == '/sw.js') {
      res.setHeader('content-type', 'text/javascript');
      createReadStream('./root/sw.js').pipe(res);
    } else if (pathname == '/robots.txt') {
      createReadStream('./root/robots.txt').pipe(res);
    } else if (pathname == '/sitemap.txt') {
      createReadStream('./root/sitemap.txt').pipe(res);
    } else if (pathname == '/__/firebase/init.js') {
      const initJs = `(function() {
        if (typeof firebase === 'undefined') {
          throw new Error(
            'hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js'
            );
          }
          const appExists = !!firebase.apps.length
          
          !appExists && firebase.initializeApp(${JSON.stringify(environment.firebase)});
        })()
      `;

      res.writeHeader(200, { 'Content-Type': 'text/html' });
      res.write(initJs);
      res.end();
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, err => {
    if (err) throw err;
    console.info('> Ready on http://localhost:3000');
  });
});
