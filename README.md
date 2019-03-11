# HiiT Clock

## Installation

Front-end environments

1. Copy `app/environments/app-env.js.dist` to `app/environments/app-env.dev.js`
2. Modify the new file appropriately

Firebase Functions environments

1. Copy `app/functions/environments/functions-env.json.dist` to `app/functions/environments/functions-env.test.json`
2. Copy `app/functions/environments/functions-env.json.dist` to `app/functions/environments/functions-env.test.json`
3. Modify the new files appropriately

## Gitlab

### Make sure to base64 encode your service-acount.json file

See [Export secret file to Gitlab pipeline](https://medium.com/@michalkalita/export-secret-file-to-gitlab-pipeline-75789eee35bd)

Run `sh bin/encode-service-account.sh` to get the encoded string.

### Set the environment variables in GitLab

- FIREBASE_DATABASE_URL
- FIREBASE_TOKEN, obtained by running `yarn ci:login` from inside the `dev` container.
- SERVICE_ACCOUNT_BASE64
