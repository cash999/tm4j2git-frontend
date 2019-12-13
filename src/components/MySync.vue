<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="table-responsive">
          <table id="q" class="table table-bordred table-striped">
            <thead>
            <th>Title</th>
            <th>Sync status</th>
            <th>JIRA project</th>
            <th>Git project</th>
            <th>Git repository</th>
            <th>Edit</th>
            <th>Delete</th>
            </thead>
            <tbody>
            <tr v-for="(mysync, index) in mysyncs">
              <td>{{mysync.data.find(obj => obj.syncTitle).syncTitle}}</td>
              <td>
                <button type="button"
                        class="btn btn-default btn-sm"
                        style="border:none;outline:none">
                  <span v-if= "mysync.data.find(obj => obj.status).status === 'pass'"
                        class="glyphicon glyphicon-ok-sign"
                        style="color:green;font-size:1.7vw"
                        v-on:click="_disableLink(mysync)">
                  </span>

                  <span v-if= "mysync.data.find(obj => obj.status).status === 'fail'"
                        class="glyphicon glyphicon-remove-sign"
                        style="color:red;font-size:1.7vw"
                        v-on:click="_getErrors(mysync)">
                  </span>
                  <span v-if= "mysync.data.find(obj => obj.status).status === 'disabled'"
                        class="glyphicon glyphicon-minus-sign"
                        style="color:grey;font-size:1.7vw"
                        v-on:click="_enableLink(mysync)">
                  </span>
                </button>
              </td>
              <td>{{mysync.data.find(obj => obj.tm4jSource).tm4jSource}}</td>
              <td>{{mysync.data.find(obj => obj.gitTargetProject).gitTargetProject}}</td>
              <td>{{mysync.data.find(obj => obj.gitTargetRepository).gitTargetRepository}}</td>
              <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs"  @click="_editSync(mysync)" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil" style="font-size:1.2vw"></span></button></p></td>
              <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" @click="_removeSync(index, mysync._id)" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash" style="font-size:1.2vw"></span></button></p></td>
              <hr>
            </tr>
            <hr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {authHeader} from '../authentication/auth-header';
  import {getTm4jConnectivityErrors, getGitConnectivityErrors, getMySync, postSyncData, postRemoveSync} from '../repository'

  export default {
    data() {
      return {
        mysync: '',
        mysyncs: [],
        getMySyncs: []
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this._getMySync();
    },
    methods: {
      _getMySync() {
        let tm4jConErrors = [];
        let gitConErrors = [];
        getTm4jConnectivityErrors()
          .then(tm4jConnectivityErrors => {
            tm4jConErrors = tm4jConnectivityErrors.data;
          });
        getGitConnectivityErrors()
          .then(gitConnectivityErrors => {
            gitConErrors = gitConnectivityErrors.data;
          });
        getMySync()
          .then(response => {
            if (response.status === 200) {
              this.getMySyncs = response.data.autoSyncData;
              this.getMySyncs.forEach(function (sync) {
                if (!Boolean(sync.data.find(autoSyncFlag => autoSyncFlag.autoSyncFlag))) {
                  sync.data.push({status: 'disabled', conError: [{type: ''}]});
                } else {
                  let conError = false;
                  let tm4jProject = (sync.data.find(obj => obj.tm4jSource).tm4jSource);
                  let gitProject = (sync.data.find(obj => obj.gitTargetProject).gitTargetProject);
                  let gitRepo = (sync.data.find(obj => obj.gitTargetRepository).gitTargetRepository);
                  if (tm4jConErrors.length > 0 && tm4jConErrors.find(obj => obj.name).name === tm4jProject) {
                    conError = true;
                    sync.data.push({status: 'fail', conError: [{type: 'tm4j'}]});
                  }
                  if (gitConErrors.length > 0 && gitConErrors.find(obj => obj.name).name === gitProject + "/" + gitRepo) {
                    conError = true;
                    sync.data.push({status: 'fail', conError: [{type: 'git'}]});
                  }
                  if (!conError) {
                    sync.data.push({status: 'pass', conError: [{type: ''}]});
                  }
                }
              });
              this.mysyncs = this.getMySyncs;
            }
          })
      },
      _editSync( eMySync ) {
        this.$router.push({path: '/editSync', query: eMySync})
      },

      _removeSync: function(index, _id) {
        this.mysyncs.splice(index, 1);
        let id = {_id: _id};
        postRemoveSync(id);
      },
      _disableLink(mySync) {
        let syncData = {
          id: mySync._id,
          syncName: mySync.syncName,
          users: mySync.data.find(obj => obj.users).users,
          syncTitle: mySync.data.find(obj => obj.syncTitle).syncTitle,
          tm4jSourceProject: mySync.data.find(obj => obj.tm4jSource).tm4jSource,
          gitTargetProject: mySync.data.find(obj => obj.gitTargetProject).gitTargetProject,
          gitTargetRepository: mySync.data.find(obj => obj.gitTargetRepository).gitTargetRepository,
          autoSyncFlag: false
        };
        mySync.data[mySync.data.findIndex(obj => obj.autoSyncFlag)].autoSyncFlag = false;
        mySync.data[mySync.data.findIndex(obj => obj.status)].status = "disabled";
        postSyncData(syncData);
      },

      _enableLink(mySync) {
        let syncData = {
          id: mySync._id,
          syncName: mySync.syncName,
          users: mySync.data.find(obj => obj.users).users,
          syncTitle: mySync.data.find(obj => obj.syncTitle).syncTitle,
          tm4jSourceProject: mySync.data.find(obj => obj.tm4jSource).tm4jSource,
          gitTargetProject: mySync.data.find(obj => obj.gitTargetProject).gitTargetProject,
          gitTargetRepository: mySync.data.find(obj => obj.gitTargetRepository).gitTargetRepository,
          autoSyncFlag: true
        };
        console.log(mySync.data.findIndex(obj => obj.autoSyncFlag));
        console.log(mySync.data.findIndex(obj => obj.syncTitle));
        console.log(JSON.stringify(mySync.data));
        mySync.data[4].autoSyncFlag = true;
        //mySync.data[mySync.data.findIndex(obj => obj.autoSyncFlag)].autoSyncFlag = true;
        mySync.data[mySync.data.findIndex(obj => obj.status)].status = "pass";
        postSyncData(syncData);
      },

      _getErrors(mysync){
        let errorMsg = '';
        mysync.data.find(obj => obj.conError).conError.forEach(function (err) {
          errorMsg = errorMsg + 'Connection Error to ' + err.type + ' server' + "\n"
        });
        alert(errorMsg);
      }
    }
  }
</script>
