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
              <td>{{mysync.data[0].syncTitle}}</td>
              <td>{{mysync.data[6].status}}</td>
              <td>{{mysync.data[1].tm4jSource}}</td>
              <td>{{mysync.data[2].gitTargetProject}}</td>
              <td>{{mysync.data[3].gitTargetRepository}}</td>
              <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs"  @click="editSync(mysync)" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
              <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" @click="removeSync(index, mysync._id)" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
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
  import {getTm4jConnectivityErrors, getGitConnectivityErrors, getMySync} from '../repository'

  export default {
    data() {
      return {
        mysync: '',
        mysyncs: [],
        getMySyncs: [],
        tm4jConErrors: [],
        gitConErrors: [],
      }
    },
    created() {
      // fetch the data when the view is created and the data is
      // already being observed
      this._getMySync();
    },
    methods: {
      _getMySync() {
        getTm4jConnectivityErrors()
          .then(tm4jConnectivityErrors => {
              this.tm4jConErrors = tm4jConnectivityErrors.data;
          });
        getGitConnectivityErrors()
          .then(gitConnectivityErrors => {
              this.tm4jConErrors = gitConnectivityErrors.data;
          });
        getMySync()
          .then(response => {
            if (response.status === 200) {
              this.getMySyncs = response.data.autoSyncData;
              this.getMySyncs.forEach(function (sync) {
                console.log(sync.data);
                if (!Boolean(sync.data.find(autoSyncFlag => autoSyncFlag.autoSyncFlag))) {
                sync.data.push({status: "disabled"});
                } else {
                  console.log(this.tm4jConErrors.length);
                  sync.data.push({status: "enabled"});
                }
              });
              this.mysyncs = this.getMySyncs;
            }
          })
      },
      editSync( eMySync ) {
        console.log('mySync  '+ eMySync.data[0].syncTitle);
        let users= eMySync.data[5].users;
        for (let i in users) {
          console.log('userList ' , users[i].user);
        }
        this.$router.push({path: '/editSync', query: eMySync})
      },

      removeSync: function(index, _id) {
        console.log(_id);
        this.mysyncs.splice(index, 1);
        this.postRemoveSync(_id);

      },
      postRemoveSync(_id) {
        console.log('post' , _id);
        axios.post('/sync/postRemoveSync',
          {
            _id: _id,
            json: true
          },
          {
            headers: authHeader()
          })
          .then(response => {
            if (response.status === 200) {
              console.log(response.status);
            }
          })
          .catch(error => {
            this.getMySync();
            console.log(error)
          })
      }
    }
  }
</script>
