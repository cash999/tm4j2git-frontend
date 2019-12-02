<template>
  <div class="container">
    <div>
      <label for="setAdministrator">Administrators</label>
      <select
        class="form-control"
        type="text"
        id="setAdministrator"
        name="setAdministrator"
        size=4>
  <!--      @input="$v.administrators.$touch()"-->
  <!--      v-model="administrators">-->
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
      <label for="addAdministrator">Add a new administrator by account:</label>
      <input
        class="form-control"
        type="text"
        id="addAdministrator"
        name="addAdministrator"
        @input="$v.addAdministrator.$touch()"
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
        name="syncInterval"
        @input="$v.setSyncInterval.$touch()"
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
        name="syncLogHoldTime"
        @input="$v.setSyncLogHoldTime.$touch()"
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
        name="errorLogHoldTime"
        @input="$v.setErrorLogHoldTime.$touch()"
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
        type="text"
        id="userNameSA"
        name="userNameSA"
        @input="$v.userNameSA.$touch()"
        v-model="userNameSA">
    </div>
    <div>
      <label for="passwordSA">Set password for service account:</label>
      <input
        class="form-control"
        type="password"
        id="passwordSA"
        name="passwordSA"
        @input="$v.passwordSA.$touch()"
        v-model="passwordSA">
    </div>
    <div>
      <label for="privateSSHKey">Set private SSH key for GIT repository:</label>
      <textarea
        class="form-control"
        id="privateSSHKey"
        name="privateSSHKey"
        rows=10
        @input="$v.privateSSHKey.$touch()"
        v-model="privateSSHKey">
        </textarea>
    </div>
    <div>
      <label for="publicSSHKey">Set public SSH key for GIT repository:</label>
      <textarea
        class="form-control"
        id="publicSSHKey"
        name="publicSSHKey"
        rows=5
        @input="$v.publicSSHKey.$touch()"
        v-model="publicSSHKey">
      </textarea>
    </div>
    <div>
      <label for="JiraBaseURL">Set base URL for JIRA/TM4J server:</label>
      <input
        class="form-control"
        type="text"
        id="JiraBaseURL"
        name="JiraBaseURL"
        @input="$v.jiraBaseURL.$touch()"
        v-model="jiraBaseURL">
    </div>
    <div>
      <label for="GitBaseUrl">Set base URL for GIT server:</label>
      <input
        class="form-control"
        type="text"
        id="GitBaseUrl"
        name="GitBaseUrl"
        @input="$v.gitBaseUrl.$touch()"
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
        jiraBaseURL: 'http://jira.swisscom.com',
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
        this.administrators.splice( this.administrators.indexOf({adminUser: addAdministrator.value}), 1 );
      },
      addAdminUser() {
        this.administrators.push({adminUser: addAdministrator.value});
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

