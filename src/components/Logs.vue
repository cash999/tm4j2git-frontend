<template>
  <div class="form-group">
    <div>
      <label for="getSync">Select your Sync</label>
      <select
        class="form-control"
        id="getSync"
        v-model="getSyncName">
        <option v-for="sync in mySyncs">
          {{ sync }}
        </option>
      </select>
      <br>
    </div>
    <div>
      <p data-placement="top"
         data-toggle="tooltip"
         title="Show Sync Logs">
          <button v-on:click="getSyncLog"
                  type="submit"
                  formaction="getSyncLog"
                  class="btn btn-primary btn-xs"
                  data-title="removeAdminUser"
                  data-toggle="modal"
                  data-target="#getSyncLog" >Show Sync for Log information
          </button>
      </p>
    </div>
    <div>
      <p v-for="syncLog in showSyncLog">{{ syncLog }}</p>
    </div>
    <div  v-if="isAdministrator">
      <p data-placement="top"
         data-toggle="tooltip"
         title="Show Error Logs">
        <button v-on:click="getErrorLog"
                type="submit"
                formaction="getErrorLog"
                class="btn btn-primary btn-xs"
                data-title="getErrorLog"
                data-toggle="modal"
                data-target="#getErrorLog" >Show Error Log information
        </button>
      </p>
    </div>
    <div>
      <p v-for="errorLog in showErrorLog">{{ errorLog }}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {authHeader} from '../authentication/auth-header';
  export default {
    data() {
      return {
        isAdministrator: false,
        mySyncs: [],
        getSyncName: '- all -',
        showErrorLog: '',
        showSyncLog: '',
        clickCountSync: 0,
        clickCountError: 0
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this.isAdmin();
      this.getSyncs();
    },
    methods: {
      isAdmin () {
        let userData = JSON.parse(localStorage.getItem('userData'));
        if (userData !== null) {
          if (userData.isAdmin) {
            this.isAdministrator = true;
          } else {
            this.isAdministrator = false;
          }
        } else {
          this.isAdministrator = false;
        }
      },
      getSyncs() {
        axios.get('/logs/getmysynclogs',
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              this.mySyncs = response.data;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getSyncLog() {
        this.clickCountSync ++;
        axios.post('/logs/synclogs',
          {
          syncName: this.getSyncName
          },
          {
            headers: authHeader(),
          })
          .then(response => {
            if (this.clickCountSync === 1) {
              if (response.status === 200) {
                this.showSyncLog = response.data;
              }
            } else if (this.clickCountSync === 2) {
              this.showSyncLog = [];
              this.clickCountSync = 0;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      getErrorLog() {
        this.clickCountError ++;
        axios.get('/logs/errorlogs',
          {
            headers: authHeader()
          })
          .then(response => {
            if (this.clickCountError === 1) {
              if (response.status === 200) {
                this.showErrorLog = response.data;
              }
            }
            else if (this.clickCountError === 2) {
              this.showErrorLog = [];
              this.clickCountError = 0;
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

