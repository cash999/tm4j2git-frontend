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
          <button v-on:click="_getSyncLog"
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
        <button v-on:click="_getErrorLog"
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
  import {getSyncs, getSyncLog, getErrorLog, getIsAdmin} from '../repository';

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
      this._getIsAdmin();
      this._getSyncs();
    },
    methods: {
      _getIsAdmin () {
        let userData = getIsAdmin();
        if (userData !== null) {
          this.isAdministrator = !!userData.isAdmin;
        } else {
          this.isAdministrator = false;
        }
      },
      _getSyncs() {
        getSyncs()
          .then(mySyncs => {
          this.mySyncs = mySyncs.data
        })
      },
      _getSyncLog() {
        this.clickCountSync ++;
        let syncName = {syncName: this.getSyncName};
        getSyncLog(syncName)
          .then(syncLog => {
            if (this.clickCountSync === 1) {
              if (syncLog.status === 200) {
                this.showSyncLog = syncLog.data;
              }
            } else if (this.clickCountSync === 2) {
              this.showSyncLog = [];
              this.clickCountSync = 0;
            }
          })
      },
      _getErrorLog() {
        this.clickCountError ++;
        getErrorLog()
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
      }
    }
  }
</script>

