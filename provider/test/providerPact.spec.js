const Verifier = require('@pact-foundation/pact').Verifier;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


describe('Pact Verification', () => {
  it('should validate the expectations of tm4j2git-backend', () => {
    let optsOrig = {
      provider: 'tm4j2git-backend',
      //logLevel: "DEBUG",
      providerBaseUrl: 'http://localhost:3000',
      pactBrokerUrl: 'https://cdc-manager-test.scapp-corp.swisscom.com',
      consumerVersionTag: ['latest'],
      pactBrokerUsername: 'tm4j2git-twm9np4mfa',
      pactBrokerPassword: 'Kr!T3f9L2!tGJw7Wnz8$',
      publishVerificationResult: true,
      providerVersion: '1.0.0',
      customProviderHeaders: ["Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGdkYmFtYXciLCJwYXNzd29yZCI6IlllZGFraTg1IiwiaXNMb2dnZWRJbiI6dHJ1ZSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTgyNjE3NDg5LCJleHAiOjE1ODI2MzkwODl9.XneOSybOeGKTVyUH0URqr8J9Jo6vLPuiUIgRYHqmvks"]
    };

    let optsExt = {
      provider: 'tm4j2gitBackend',
      logLevel: "DEBUG",
      providerBaseUrl: 'http://localhost:3000',
      pactBrokerUrl: 'https://test.pact.dius.com.au/',
      consumerVersionTag: ['test'],
      pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
      pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
      publishVerificationResult: true,
      providerVersion: '1.0.0',
      customProviderHeaders: ["Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGdkYmFtYXciLCJwYXNzd29yZCI6IlllZGFraTg1IiwiaXNMb2dnZWRJbiI6dHJ1ZSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTgyNjk1MjU0LCJleHAiOjE1ODI3MTY4NTR9.mRkagqqXeTRHqe10hQMk93SP2Nfdn3m0rhWr0WunEDg"]
    };


    //use local contract from path
    let opts = {
      provider: 'tm4j2git-backend',
      providerBaseUrl: 'http://localhost:3000',
      pactUrls: [
        path.resolve(
          process.cwd(),
          './pacts/tm4j2git-frontend-tm4j2git-backend.json'
        ),
      ],
      customProviderHeaders: ["Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGdkYmFtYXciLCJwYXNzd29yZCI6IlllZGFraTg1IiwiaXNMb2dnZWRJbiI6dHJ1ZSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTgyNjk1MjU0LCJleHAiOjE1ODI3MTY4NTR9.mRkagqqXeTRHqe10hQMk93SP2Nfdn3m0rhWr0WunEDg"]
    };

    return new Verifier().verifyProvider(opts).then(output => {
      console.log('Pact Verification Complete!');
      console.log(output)
    })
  })
});
