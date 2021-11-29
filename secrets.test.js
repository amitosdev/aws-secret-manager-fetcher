/* eslint-env jest */
const { fetchSecrets } = require('./secrets')
const { mockClient } = require('aws-sdk-client-mock')
const { SecretsManagerClient } = require('@aws-sdk/client-secrets-manager')
const smMock = mockClient(SecretsManagerClient)
const secrets = { foo: 'bar' }
smMock.resolves({ SecretString: JSON.stringify(secrets) })

describe('fetchSecrets', () => {
  describe('invalid or missing params', () => {
    test('no secret name will throw', async () => {
      await expect(async () => await fetchSecrets()).rejects.toThrowError(
        'secret name must be a string'
      )
    })
    test('invalid secret name will throw', async () => {
      await expect(async () => await fetchSecrets({})).rejects.toThrowError(
        'secret name must be a string'
      )
    })
  })
  describe('fetching secrets', () => {
    test('no region will use default', async () => {
      const secrets = await fetchSecrets('foo')
      expect(secrets).toEqual(secrets)
    })
  })
})
