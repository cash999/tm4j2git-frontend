const chai = require('chai');
const path = require('path');
const chaiAsPromised = require('chai-as-promised');
const Pact = require('@pact-foundation/pact').Pact;
const expect = chai.expect;
const API_PORT = process.env.API_PORT || 9123;
const { fetchProviderData } = require('./client');
chai.use(chaiAsPromised);

// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN'

const provider = new Pact({
  consumer: 'tm4j2git-frontend',
  provider: 'tm4j2git-backend',
  port: API_PORT,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: LOG_LEVEL,
  spec: 2,
});


describe('act with tm4j2git backend', () => {
  before(() => {
    return provider.setup()
  });

  describe('given get data from backend', () => {
    // describe('when a call to get TM4J Projects from the tm4j2git backend is made', () => {
    //   before(() => {
    //     provider.addInteraction({
    //       uponReceiving: 'a request for get projects list from TM4J',
    //       withRequest: {
    //         method: 'GET',
    //         path: '/sync/getTm4jProjects',
    //       },
    //       willRespondWith: {
    //         status: 200,
    //         headers: {
    //           'Content-Type': 'application/json; charset=utf-8',
    //         },
    //         body: {
    //           avatarId: 24053,
    //           name: "Agile Testing Service",
    //           id: "21681",
    //           key: "ATS"
    //         },
    //       },
    //     })
    //   });
    //
    //   it('can process the JSON payload from the TM4J provider', () => {
    //     let url = '/sync/getTm4jProjects';
    //     const response = fetchProviderData(url);
    //     return expect(response).to.eventually.have.property('key', 'ATS')
    //   });
    //
    //   it('should validate the interactions and create a contract', () => {
    //     return provider.verify()
    //   })
    // });
    //
    // describe('when a call to get GIT Projects from the tm4j2git backend is made', () => {
    //   before(() => {
    //     provider.addInteraction({
    //       uponReceiving: 'a request for get projects list from GIT',
    //       withRequest: {
    //         method: 'GET',
    //         path: '/sync/getGitProjects',
    //       },
    //       willRespondWith: {
    //         status: 200,
    //         headers: {
    //           'Content-Type': 'application/json; charset=utf-8',
    //         },
    //         body: {
    //           size: 1,
    //           limit: 1000,
    //           isLastPage: true,
    //           values: [
    //             {
    //               key: "ATS",
    //               id: 3964,
    //               name: "Agile Testing Services",
    //               description: "Responsible : Weber Thomas INI-DEV-FDN-ENB",
    //               public: false,
    //               type: "NORMAL",
    //               links: {
    //                 self: [
    //                   {
    //                     href: "https://git.swisscom.com/projects/ATS"
    //                   }
    //                 ]
    //               }
    //             }
    //           ],
    //           start: 0
    //         },
    //       },
    //     })
    //   });
    //
    //   it('can process the JSON payload from the GIT provider', () => {
    //     let url = '/sync/getGitProjects';
    //     const response = fetchProviderData(url);
    //     //return expect(response).to.eventually.have.property('size', 1)
    //     return expect(response).to.eventually.have.property('values')
    //
    //   });
    //
    //   it('should validate the interactions and create a contract', () => {
    //     return provider.verify()
    //   })
    // });

    describe('when a call to get Administrators from the tm4j2git backend is made', () => {
      before(() => {
        provider.addInteraction({
          uponReceiving: 'a request for administrator list from database',
          withRequest: {
            method: 'GET',
            path: '/admin/getAdminUserList',
          },
          willRespondWith: {
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: [
              { _id: '5e312f77a21a6035a41a1db8', adminUser: 'SA-PF00-ATS' },
              { _id: '5e312f77a21a6035a41a1db9', adminUser: 'tgdlima3' },
              { _id: '5e312f77a21a6035a41a1dba', adminUser: 'tgdbamaw' },
              { _id: '5e312f77a21a6035a41a1dbb', adminUser: 'tgdweth9' }
            ]
            ,
          },
        })
      });

      it('can process the JSON payload from the Database provider', () => {
        let url = '/admin/getAdminUserList';
        const response = fetchProviderData(url);
        //return expect(response).to.eventually.have.property('_id', '5e312f77a21a6035a41a1db8')
        return expect(response).to.eventually.be.an('array')
      });

      it('should validate the interactions and create a contract', () => {
        return provider.verify()
      })
    });

    // Write pact files to file
    after(() => {
      return provider.finalize()
    })
  })
});
