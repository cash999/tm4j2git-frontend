<template>
  <div>
<!--  <form @submit.prevent="onSubmit">-->
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
        <option v-for="tm4jProject in tm4jProjects" :selected="tm4jProject === eTm4JProject">
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
        <option v-for="gitProject in gitProjects" :selected="gitProject === eGitProject">
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
        <option value="">-- Select the GIT repository --</option>
        <option v-for="gitRepo in gitRepos">
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
    <br>
    <div class="form-group">
      <label for="userList">User list</label>
      <select
        class="form-control"
        id="userList"
        name="userList"
        size="userList.length"
        @input="$v.userList.$touch()"
        v-model="userList">
        //v-on:focus="getGitProjects"
        <option v-for="user in userlist">
          {{ user }}
        </option>
      </select>
      <button class="btn btn-primary" type=submit :disabled="$v.$invalid">Add user</button>
      <button class="btn btn-primary" type=submit :disabled="$v.$invalid">Remove user</button>
    </div>
    <button class="btn btn-primary" type=submit :disabled="$v.$invalid">Save</button>
<!--  </form>-->
  </div>
</template>

<script>
    import axios from 'axios';
    import {required} from 'vuelidate/lib/validators';
    import {authHeader} from '../authentication/auth-header';
    import {bus} from '../main';

    export default {
        data() {
            bus.$once('MySyncInput', (eMySync) => {
                this.eSyncTitle = eMySync.data[0].syncTitle;
            });

            return {
                syncTitle:  this.eSyncTitle,
                tm4jProjects: [],
                tm4jSourceProject: '',
                gitProjects: [],
                gitTargetProject: '',
                gitRepos: [],
                gitTargetRepository: '',
                autoSyncFlag: '',
                eSyncTitle: '',
                eSyncId: '',
                eTm4JProject: '',
                eGitProject: '',
                eGitRepo: '',
                eAutoSyncFlag: [],
                userList: [],
                user: ''
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
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.getTm4Projects();
            this.getGitProjects();
            // this.syncTitle='syncTitle';
            // this.getBusData();
            // // bus.$once('MySyncInput', (eMySync) => {
            // //     this.setData(eMySync);
            // //     // this.syncTitle = eMySync.data[0].syncTitle;
            // //     console.log('created', this.syncTitle);
            // // });


        },
        methods: {
            // getBusData(){
            //     bus.$once('MySyncInput', (eMySync) => {
            //     })
            //     .then(mySync => {
            //
            //         this.syncTitle = mySync.data[0].syncTitle;
            //         console.log('created', this.syncTitle)
            //
            //     })
            // },
            // setData(eMySync) {
            //     // this.eSyncTitle = eMySync.data[0].syncTitle;
            //     this.eTm4JProject = eMySync.data[1].tm4jSource;
            //     this.eGitProject = eMySync.data[2].gitTargetProject;
            //     this.eGitRepo = eMySync.data[3].gitTargetRepository;
            //     this.eAutoSyncFlag = eMySync.data[4].autoSyncFlag;
            //     console.log('setdata', this.eGitProject);
            // },
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
                let self = this;
                axios.post('/sync/addSync',
                    {
                        user: this.user,
                        syncTitle: this.syncTitle,
                        tm4jSourceProject: this.tm4jSourceProject,
                        gitTargetProject: this.gitTargetProject,
                        gitTargetRepository: this.gitTargetRepository,
                        autoSyncFlag: this.autoSyncFlag,
                        json: true
                    })
                    .then(response => {
                        if (response.status == '201') {
                            console.log(response.status);
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
