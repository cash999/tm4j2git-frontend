<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="table-responsive">
          <table id="q" class="table table-bordred table-striped">
            <thead>
            <th>Title</th>
            <th>JIRA project</th>
            <th>Git project</th>
            <th>Git repository</th>
            <th>Edit</th>
            <th>Delete</th>
            </thead>
            <tbody>
            <tr v-for="mysync in mysyncs">
              <td>{{mysync.data[0].syncTitle}}</td>
              <td>{{mysync.data[1].tm4jSource}}</td>
              <td>{{mysync.data[2].gitTargetProject}}</td>
              <td>{{mysync.data[3].gitTargetRepository}}</td>
              <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
              <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>
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

    export default {
        data() {
            return {
                mysync: '',
                mysyncs: []
            }
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.getMySync();
        },
        methods: {
            getMySync() {
                axios.get('/sync/getMySync',
                    {
                        headers: authHeader(),
                        params: {
                            json: true
                        }
                    })
                    .then(response => {
                        if (response.status === 200) {
                            console.log(response.status);
                            console.log(response.data.autoSyncData);
                            this.mysyncs = response.data.autoSyncData;
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>
