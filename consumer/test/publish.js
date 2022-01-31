const pact = require('@pact-foundation/pact-node');
const path = require('path');

const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../../pacts/')],
  pactBroker: 'https://cdc-manager-test.scapp-corp.swisscom.com',
  pactBrokerUsername: 'tm4j2git-twm9np4mfa',
  pactBrokerPassword: 'Kr!T3f9L2!tGJw7Wnz8$',
  tags: ['latest'],
  consumerVersion: '1.0.' + (process.env.USER ? process.env.USER : Math.floor(new Date() / 1000))
};

// const opts = {
//   pactFilesOrDirs: [path.resolve(__dirname, '../../pacts/')],
//   pactBroker: 'https://test.pact.dius.com.au',
//   pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
//   pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
//   tags: ['test'],
//   consumerVersion: '1.0.' + (process.env.USER ? process.env.USER : Math.floor(new Date() / 1000))
// };

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!');
    console.log('');
    console.log('Head over to https://cdc-manager-test.scapp-corp.swisscom.com and login with');
    //console.log('=> Username: tm4j2git-9lssxcfcnq');
    //console.log('=> Password: ifMZ*9hYBk2yq*hTwWjm');
    console.log('to see your published contracts.');
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  });
