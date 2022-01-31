<template>
  <div class="form-group">
    <div>
      <label for="setAdministrator">Administrators</label>
      <select
        class="form-control"
        id="setAdministrator"
        size=3
        v-model="setAdministrator">
        <option v-for="administrator in administrators">
          {{administrator.adminUser }}
        </option>
      </select>
    </div>
    <div>
      <p data-placement="top"
         data-toggle="tooltip"
         title="Remove Admin User">
          <button v-on:click="_removeAdminUser"
                  id="removeAdmin"
                  type="submit"
                  formaction="removeAdmin"
                  class="btn btn-primary btn-xs"
                  data-title="removeAdminUser"
                  data-toggle="modal"
                  data-target="#removeAdminUser" >Remove selected Admin User
          </button>
      </p>
    </div>
    <div>
      <label for="addAdministrator">Add a new administrator by account:</label>
      <input
        class="form-control"
        id="addAdministrator"
        v-model="addAdministrator">
    </div>
    <div>
      <p data-placement="top"
         data-toggle="tooltip"
         title="Add Admin User">
        <button v-on:click="_addAdminUser"
                id="addAdmin"
                type="submit"
                formaction="addAdmin"
                class="btn btn-primary btn-xs"
                data-title="addAdminUser"
                data-toggle="modal"
                data-target="#addAdminUser" >Add Admin User
        </button>
      </p>
    </div>
    <div>
      <label for="syncInterval">Set Sync Interval:</label>
      <select
        class="form-control"
        id="syncInterval"
        v-model="setSyncInterval">
        <option
          v-for="syncInterval in syncIntervals" :selected="syncInterval === setSyncInterval">
          {{ syncInterval }}
        </option>
      </select>
    </div>
    <div>
      <label for="syncLogHoldTime">Set hold time for Sync logs:</label>
      <select
        class="form-control"
        id="syncLogHoldTime"
        v-model="setSyncLogHoldTime">
        <option v-for="syncLogHoldTime in syncLogHoldTimes" :selected="syncLogHoldTime === setSyncLogHoldTime">
          {{ syncLogHoldTime }}
        </option>
      </select>
    </div>
    <div>
      <label for="errorLogHoldTime">Set hold time for Error logs:</label>
      <select
        class="form-control"
        id="errorLogHoldTime"
        v-model="setErrorLogHoldTime">
        <option v-for="errorLogHoldTime in errorLogHoldTimes" :selected="errorLogHoldTime === setErrorLogHoldTime">
          {{ errorLogHoldTime }}
        </option>
      </select>
    </div>
    <div>
      <label for="userNameSA">Set username for service account:</label>
      <input
        class="form-control"
        id="userNameSA"
        v-model="userNameSA">
    </div>
    <div>
      <label for="passwordSA">Set password for service account:</label>
      <input
        class="form-control"
        type="password"
        id="passwordSA"
        v-model="passwordSA">
    </div>
    <div>
      <label for="privateSSHKey">Set private SSH key for GIT repository:</label>
      <textarea
        class="form-control"
        id="privateSSHKey"
        rows=10
        v-model="privateSSHKey">
        </textarea>
    </div>
    <div>
      <label for="publicSSHKey">Set public SSH key for GIT repository:</label>
      <textarea
        class="form-control"
        id="publicSSHKey"
        rows=5
        v-model="publicSSHKey">
      </textarea>
    </div>
    <div>
      <label for="JiraBaseURL">Set base URL for JIRA/TM4J server:</label>
      <input
        class="form-control"
        id="JiraBaseURL"
        v-model="jiraBaseURL">
    </div>
    <div>
      <label for="GitBaseUrl">Set base URL for GIT server:</label>
      <input
        class="form-control"
        id="GitBaseUrl"
        v-model="gitBaseUrl">
    </div>
    <br>
    <div>
      <p data-placement="top"
         data-toggle="tooltip"
         title="Save Admin Settings">
        <button v-on:click="_onSubmit"
                type="submit"
                formaction="saveAdminSettings"
                class="btn btn-primary btn-xs"
                data-title="saveAdminSettings"
                data-toggle="modal"
                data-target="#saveAdminSettings" >Save
        </button>
      </p>
    </div>
  </div>
</template>

<script>
  import {getAdministrators,
          getSyncInterval,
          getSyncLogHoldTime,
          getErrorLogHoldTime,
          getUserNameSA,
          getPasswordSA,
          getPrivateSSHKey,
          getPublicSSHKey,
          getJiraBaseURL,
          getGitBaseURL,
          postAdminData
         } from '../repository';

  export default {
    data() {
      return {
        administrators: [],
        setAdministrator: '',
        addAdministrator: '',
        syncIntervals: ['5 min','15 min','30 min','60 min','120 min'],
        setSyncInterval: '',
        syncLogHoldTimes: ['1 week','2 weeks','3 weeks','4 weeks'],
        setSyncLogHoldTime: '',
        errorLogHoldTimes: ['1 week','2 weeks','3 weeks','4 weeks'],
        setErrorLogHoldTime: '',
        userNameSA: '',
        passwordSA: '',
        privateSSHKey: '',
        publicSSHKey: '',
        jiraBaseURL: 'https://jira.swisscom.com',
        gitBaseUrl: ''
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this._getAdministrators();
      this._getSyncInterval();
      this._getSyncLogHoldTime();
      this._getErrorLogHoldTime();
      this._getUserNameSA();
      this._getPasswordSA();
      this._getPrivateSSHKey();
      this._getPublicSSHKey();
      this._getJiraBaseURL();
      this._getGitBaseURL();
      this._removeAdminUser();
      this._addAdminUser();
    },
    methods: {
      _getAdministrators() {
        getAdministrators()
          .then(response => {
            if (response.status === 200) {
              this.administrators = response.data;
            }
          })
      },
      _getSyncInterval() {
        getSyncInterval()
          .then(response => {
            if (response.status === 200) {
              this.setSyncInterval = response.data;
            }
          })
      },
      _getSyncLogHoldTime() {
        getSyncLogHoldTime()
          .then(response => {
            if (response.status === 200) {
              this.setSyncLogHoldTime = response.data;
            }
          })
      },
      _getErrorLogHoldTime() {
        getErrorLogHoldTime()
          .then(response => {
            if (response.status === 200) {
              this.setErrorLogHoldTime = response.data;
            }
          })
      },
      _getUserNameSA() {
        getUserNameSA()
          .then(response => {
            if (response.status === 200) {
              this.userNameSA = response.data;
            }
          })
      },
      _getPasswordSA() {
        getPasswordSA()
          .then(response => {
            if (response.status === 200) {
              this.passwordSA = response.data;
            }
          })
      },
      _getPrivateSSHKey() {
        getPrivateSSHKey()
          .then(response => {
            if (response.status === 200) {
              this.privateSSHKey = response.data;
            }
          })
      },
      _getPublicSSHKey() {
        getPublicSSHKey()
          .then(response => {
            if (response.status === 200) {
              this.publicSSHKey = response.data;
            }
          })
      },
      _getJiraBaseURL() {
        getJiraBaseURL()
          .then(response => {
            if (response.status === 200) {
              this.jiraBaseURL = response.data;
            }
          })
      },
      _getGitBaseURL() {
        getGitBaseURL()
          .then(response => {
            if (response.status === 200) {
              this.gitBaseUrl = response.data;
            }
          })
      },
      _removeAdminUser() {
        this.administrators.splice(this.administrators.findIndex(admin => admin.adminUser === this.setAdministrator), 1 );
      },
      _addAdminUser() {
        this.administrators.push({adminUser: this.addAdministrator});
        this.addAdministrator = '';
      },
      _onSubmit() {
        let adminData = {
              adminUsers: this.administrators,
              setSyncInterval: this.setSyncInterval,
              setSyncLogHoldTime: this.setSyncLogHoldTime,
              setErrorLogHoldTime: this.setErrorLogHoldTime,
              serviceAccountUser: this.userNameSA,
              serviceAccountPassword: this.passwordSA,
              sshPrivateKey: this.privateSSHKey,
              sshPublicKey: this.publicSSHKey,
              tm4jURL: this.jiraBaseURL,
              gitURL: this.gitBaseUrl
          };
        postAdminData(adminData)
          .then(response => {
            if (response.status === 201) {
              this.$router.push('mySync');
            }
          })
      },
    }
  }
</script>

