# HiiT Clock

## Installation

Front-end environments

1. Edit `app/environments/app-env.dev.js`
2. Edit `app/environments/app-env.prod.js`

Firebase Functions environments

1. Edit `app/functions/environments/functions-env.test.json`
2. Edit `app/functions/environments/functions-env.test.json`

## Gitlab

### Make sure to base64 encode your service-acount.json file

See [Export secret file to Gitlab pipeline](https://medium.com/@michalkalita/export-secret-file-to-gitlab-pipeline-75789eee35bd)

Run `sh bin/encode-service-account.sh` to get the encoded string.

### Set the environment variables in GitLab

- FIREBASE_DATABASE_URL
- FIREBASE_TOKEN, obtained by running `yarn ci:login` from inside the `dev` container.
- SERVICE_ACCOUNT_BASE64
