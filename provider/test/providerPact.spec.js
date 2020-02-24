const Verifier = require('@pact-foundation/pact').Verifier;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const { server, dataStore } = require('../provider.js');


//Set the current state
server.post('/setup', (req, res) => {
  switch (req.body.state) {
    case 'date count == 0':
      dataStore.count = 0;
      break;
    default:
      dataStore.count = 1000
  }

  res.end()
});

server.listen(8081, () => {
  console.log('Provider service listening on http://localhost:8081')
});

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of tm4j2git-backend', () => {
    let opts = {
      provider: 'tm4j2git-backend',
      providerBaseUrl: 'http://localhost:8081',
      providerStatesUrl: 'http://localhost:8081/states',
      providerStatesSetupUrl: 'http://localhost:8081/setup',
      pactBrokerUrl: 'https://cdc-manager-test.scapp-corp.swisscom.com/',
      consumerVersionTag: ['latest'],
      pactBrokerUsername: 'tm4j2git-twm9np4mfa',
      pactBrokerPassword: 'Kr!T3f9L2!tGJw7Wnz8$',
      publishVerificationResult: true,
      providerVersion: '1.0.0',
    };
    //
    // let opts = {
    //   provider: 'Our Provider',
    //   providerBaseUrl: 'http://localhost:8081',
    //   providerStatesUrl: 'http://localhost:8081/states',
    //   providerStatesSetupUrl: 'http://localhost:8081/setup',
    //   pactBrokerUrl: 'https://test.pact.dius.com.au',
    //   consumerVersionTag: ['*prod'],
    //   pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
    //   pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
    //   publishVerificationResult: true,
    //   providerVersion: '1.0.0',
    // };

    return new Verifier().verifyProvider(opts).then(output => {
      console.log('Pact Verification Complete!');
      console.log(output)
    })
  })
});
