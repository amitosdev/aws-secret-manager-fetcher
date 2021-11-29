# AWS Secret Manager Fetcher [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A dead simple module to fetch secrets from AWS secret manager.

## Install

```bash
> npm install --save aws-secret-manager-fetcher
```

## Usage

```javascript
const { getSecrets } = require('aws-secret-manager-fetcher')

async function init () {
  try {
    let secrets = await getSecrets('my-secret-name')
  } catch (e) {
    console.log('Error getting secrets ', e)
  }
}
```

## API

### `getSecrets(secretName, [, awsParams])`

* `secretName` (String) - name of your secret.
* `awsParams` (Object) - AWS SecretManager constructor [params](ttps://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SecretsManager.html#constructor-property). If empty or missing a region property, the default will be: `{ region: 'us-east-1' }`
