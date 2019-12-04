<template>
  <div class="container">
    <div>
      <label for="setAdministrator">Administrators</label>
      <select
        class="form-control"
        id="setAdministrator"
        size=3
        v-model="setAdministrator">
        <option v-for="administrator in administrators">
          {{ administrator.adminUser }}
        </option>
      </select>
    </div>
    <div>
      <p data-placement="top"
         data-toggle="tooltip"
         title="Remove Admin User">
          <button v-on:click="removeAdminUser"
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
      <label for="addAdministratorw">Add a new administrator by account:</label>
      <input
        class="form-control"
        id="addAdministratorw"
        v-model="addAdministrator">
    </div>
    <div>
      <p data-placement="top"
         data-toggle="tooltip"
         title="Add Admin User">
        <button v-on:click="addAdminUser"
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
    <div>
      <p data-placement="top"
         data-toggle="tooltip"
         title="Save Admin Settings">
        <button v-on:click="onSubmit"
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
  import axios from 'axios';
  import {authHeader} from '../authentication/auth-header';
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
      this.getAdministrators();
      this.getSyncInterval();
      this.getSyncLogHoldTime();
      this.getErrorLogHoldTime();
      this.getUserNameSA();
      this.getPasswordSA();
      this.getPrivateSSHKey();
      this.getPublicSSHKey();
      this.getJiraBaseURL();
      this.getGitBaseURL();
      this.removeAdminUser();
      this.addAdminUser();
    },
    methods: {
      getAdministrators() {
        axios.get('/admin/getAdminUserList',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              console.log(response.data);
              this.administrators = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getSyncInterval() {
        axios.get('/admin/getSyncInterval',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              this.setSyncInterval = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getSyncLogHoldTime() {
        axios.get('/admin/getSyncLogHoldTime',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              this.setSyncLogHoldTime = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getErrorLogHoldTime() {
        axios.get('/admin/getErrorLogHoldTime',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              this.setErrorLogHoldTime = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getUserNameSA() {
        axios.get('/admin/getUserNameSA',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              this.userNameSA = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getPasswordSA() {
        axios.get('/admin/getPasswordSA',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              this.passwordSA = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getPrivateSSHKey() {
        axios.get('/admin/getPrivateSSHKey',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              this.privateSSHKey = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getPublicSSHKey() {
        axios.get('/admin/getPublicSSHKey',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              this.publicSSHKey = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getJiraBaseURL() {
        axios.get('/admin/getJiraBaseURL',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              this.jiraBaseURL = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getGitBaseURL() {
        axios.get('/admin/getGitBaseURL',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              this.gitBaseUrl = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      removeAdminUser() {
        //this.administrators.splice( this.administrators.indexOf({adminUser: addAdministrator.value}), 1 );
        this.administrators.splice( this.administrators.indexOf({adminUser: this.setAdministrator}), 1 );

      },
      addAdminUser() {
        //this.administrators.push({adminUser: addAdministrator.value});
        this.administrators.push({adminUser: this.addAdministrator});
        this.addAdministrator = '';
      },
      onSubmit() {
        let self = this;
        console.log(this.administrators.length);
        axios.post('/admin/saveAdminSettings',
          {
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
          },
          {
            headers: authHeader(),
          })
          .then(response => {
            if (response.status === 201) {
              self.$router.push('mySync');
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
    }
  }
</script>

