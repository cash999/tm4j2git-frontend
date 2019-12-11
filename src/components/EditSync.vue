<template>
  <div>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="syncTitle">Title</label>
      <input
        class="form-control"
        type="text"
        id="syncTitle"
        name="syncTitle"
        v-model="syncTitle">
    </div>
    <div class="form-group">
      <label for="tm4jSourceProject">JIRA - project list</label>
      <select
        class="form-control"
        id="tm4jSourceProject"
        name="tm4jSourceProject"
        @input="$v.tm4jSourceProject.$touch()"
        v-model="tm4jSourceProject">
        <option v-for="tm4jProject in tm4jProjects" :selected="tm4jProject === tm4jSourceProject">
          {{ tm4jProject }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="gitTargetProject">GIT - project list</label>
      <select
        class="form-control"
        id="gitTargetProject"
        name="gitTargetProject"
        v-on:change="getGitRepos"
        @input="$v.gitTargetProject.$touch()"
        v-model="gitTargetProject">
        //v-on:focus="getGitProjects"
        <option value="">  </option>
        <option v-for="gitProject in gitProjects" :selected="gitProject === gitTargetProject">
          {{ gitProject }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="gitTargetRepository">GIT repository list</label>
      <select
        class="form-control"
        id="gitTargetRepository"
        name="gitTargetRepository"
        v-on:focus="getGitRepos"
        @input="$v.gitTargetProject.$touch()"
        v-model="gitTargetRepository">
        <option v-for="gitRepo in gitRepos" :selected="gitRepo === gitTargetRepository">
          {{ gitRepo }}
        </option>
      </select>
    </div>
    <div class="form-check">
      <input class="form-check-input"
             id="autoSyncFlag"
             type="checkbox"
             value="true"
             v-model="autoSyncFlag">
      <label class="form-check-label">
        Enable automatic synchronisation
      </label>
    </div>
    <div class="form-group">
      <label for="userList">User list</label>
      <select
        class="form-control"
        id="userList"
        name="userList"
        size=3
        v-model="rUser">
        <option v-for="user in userList">
          {{ user.user }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <button class="btn btn-primary btn-xs" type=button @click="removeUser">Remove user</button>
    </div>
    <div class="form-group">
      <label for="AddUser">Add a new user account</label>
      <input
        class="form-control"
        type="text"
        id="addUser"
        name="addUser"
        v-model="aUser">
    </div>
    <div>
      <button class="btn btn-primary btn-xs" type=button @click="addUser">Add user</button>
    </div>
      <br>
      <button class="btn btn-primary" :disabled="$v.$invalid">Save sync</button>
  </form>
  </div>
</template>

<script>
    import axios from 'axios';
    import {required} from 'vuelidate/lib/validators';
    import {authHeader} from '../authentication/auth-header';

    export default {
        data() {
            return {
                syncTitle: '',
                tm4jProjects: [],
                tm4jSourceProject: '',
                gitProjects: [],
                gitTargetProject: '',
                gitRepos: [],
                gitTargetRepository: '',
                autoSyncFlag: '',
                syncId: '',
                userList: [],
                rUser:'',
                aUser:'',
            }
        },
        //For input validation from npm module vuelidate
        validations: {
            syncTitle: {
                required
            },
            tm4jSourceProject: {
                required
            },
            gitTargetProject: {
                required
            },
            gitTargetRepository: {
                required
            },
            userList: {
                required
            }
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.getTm4Projects();
            this.getGitProjects();
            this.syncTitle = this.$route.query.data[0].syncTitle;
            // this.eMySync = this.$route.query.data;
            this.tm4jSourceProject = this.$route.query.data[1].tm4jSource;
            this.gitTargetProject = this.$route.query.data[2].gitTargetProject;
            this.getGitRepos();
            this.gitTargetRepository = this.$route.query.data[3].gitTargetRepository;
            this.autoSyncFlag = this.$route.query.data[4].autoSyncFlag;
            this.userList = this.$route.query.data[5].users;
            console.log('created',this.$route.query.data[5].users);


        },
        methods: {
            removeUser() {
                console.log('rUser',this.rUser);
                console.log('rUserList', this.userList);
                console.log('rUserIndex',this.userList.findIndex( users => users.user === this.rUser));
                this.userList.splice(this.userList.findIndex( users => users.user === this.rUser) , 1 );
                console.log('rUserList', this.userList);
            },
            addUser() {
                console.log(this.aUser);
                this.userList.push({user: this.aUser});
                console.log('aUserList', this.userList);
                this.aUser ='';
            },
            getTm4Projects() {
                axios.get('/sync/getTm4jProjects',
                    {
                        headers: authHeader()
                    })
                    .then(response => {
                        if (response.status === 200) {
                            this.tm4jProjects = response.data.tm4jProjects;
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getGitProjects() {
                axios.get('/sync/getGitProjects',
                    {
                        headers: authHeader()
                    })
                    .then(response => {
                        if (response.status === 200) {
                            this.gitProjects = response.data.gitProjects;
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getGitRepos() {
                axios.get('/sync/getGitRepos',
                    {
                        headers: authHeader(),
                        params: {
                            gitProject: this.gitTargetProject,
                            json: true
                        }
                    })
                    .then(response => {
                        if (response.status === 200) {
                            this.gitRepos = response.data.gitRepos;
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            onSubmit() {
                // let userData = JSON.parse(localStorage.getItem('userData'));
                axios.post('/sync/postEditMysync',
                    {
                        syncTitle: this.syncTitle,
                        tm4jSourceProject: this.tm4jSourceProject,
                        gitTargetProject: this.gitTargetProject,
                        gitTargetRepository: this.gitTargetRepository,
                        autoSyncFlag: this.autoSyncFlag,
                        users: this.userList,
                        json: true
                    },
                    {
                        headers: authHeader(),
                    })
                    .then(response => {
                        if (response.status == '201') {
                            console.log(response.status);
                            this.$router.push('mySync');
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
        }
    }
</script>
