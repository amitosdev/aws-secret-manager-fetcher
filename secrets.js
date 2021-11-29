const {
  SecretsManagerClient,
  GetSecretValueCommand
} = require('@aws-sdk/client-secrets-manager')
const debug = require('debug')('aws-secret-manager-fetcher')
const isString = require('lodash.isstring')
const { inspect } = require('util')

module.exports.fetchSecrets = async (
  secretName,
  { region = 'us-east-1', ...awsParms } = {}
) => {
  debug(
    `called for secret name: "${secretName}", region: "${region}", aws params: ${inspect(
      awsParms
    )}`
  )
  const client = new SecretsManagerClient({ region, ...awsParms })
  if (!isString(secretName)) throw new Error('secret name must be a string')
  const { SecretString } = await client.send(
    new GetSecretValueCommand({ SecretId: secretName })
  )
  debug('client response: ', SecretString)
  return JSON.parse(SecretString)
}
