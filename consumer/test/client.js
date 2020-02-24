const request = require('superagent');
const API_HOST = process.env.API_HOST || 'http://localhost';
const API_PORT = process.env.API_PORT || 9123;
const API_ENDPOINT = `${API_HOST}:${API_PORT}`;

// Fetch provider data
const fetchProviderData = url => {
  return request
    .get(`${API_ENDPOINT}` + url)
    .then(res => {
      switch (url) {
        case '/sync/getTm4jProjects':
          return {
            avatarId: 24053,
            name: "Agile Testing Service",
            id: "21681",
            key: "ATS"
          };
          break;
        case'/sync/getGitProjects':
          return {
            size: 1,
            limit: 1000,
            isLastPage: true,
            values: [
              {
                key: "ATS",
                id: 3964,
                name: "Agile Testing Services",
                description: "Responsible : Weber Thomas INI-DEV-FDN-ENB",
                public: false,
                type: "NORMAL",
                links: {
                  self: [
                    {
                      href: "https://git.swisscom.com/projects/ATS"
                    }
                  ]
                }
              }
            ],
            start: 0
          }
          break;
        case '/admin/getAdminUserList':
          return {
            _id: "5e312f77a21a6035a41a1db8",
            adminUser: "SA-PF00-ATS"
          }
          break;
      }
    })
};


module.exports = {
  fetchProviderData,
};
