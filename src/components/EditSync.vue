<template>
  <div>
  <form @submit.prevent="_onSubmit">
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
        v-on:change="_getGitRepos"
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
        v-on:focus="_getGitRepos"
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
      <button class="btn btn-primary btn-xs" type=button @click="_removeUser">Remove user</button>
    </div>
    <div class="form-group">
      <label for="addUser">Add a new user account</label>
      <input
        class="form-control"
        type="text"
        id="addUser"
        name="addUser"
        v-model="aUser">
    </div>
    <div>
      <button class="btn btn-primary btn-xs" type=button @click="_addUser">Add user</button>
    </div>
      <br>
      <button class="btn btn-primary" type="submit" :disabled="$v.$invalid">Save sync</button>
  </form>
  </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import {
      getTm4jProjects,
      getGitProjects,
      getGitRepos, postSyncData
    } from '../repository';


    export default {
        data() {
            return {
                id: '',
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
                aUser:''
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
            this._getTm4Projects();
            this._getGitProjects();
            this.id = this.$route.query._id;
            this.syncTitle = this.$route.query.data[0].syncTitle;
            this.tm4jSourceProject = this.$route.query.data[1].tm4jSource;
            this.gitTargetProject = this.$route.query.data[2].gitTargetProject;
            this._getGitRepos();
            this.gitTargetRepository = this.$route.query.data[3].gitTargetRepository;
            this.autoSyncFlag = this.$route.query.data[4].autoSyncFlag;
            this.userList = this.$route.query.data[5].users;
        },
        methods: {
            _removeUser() {
                if (this.userList.length <=1) {
                    alert('At least one user has to be on the user list!');
                } else {
                    this.userList.splice(this.userList.findIndex( users => users.user === this.rUser) , 1 );
                }
            },
            _addUser() {
                let getExistUser = this.userList.find( existUsers => existUsers.user === this.aUser);
                if (this.aUser === '') {
                    alert('User name is not correct!')
                } else if
                    (getExistUser === undefined) {
                        this.userList.push({user: this.aUser});
                }
                else {
                    alert('User already exists!')
                }
            },
            _getTm4Projects() {
                getTm4jProjects()
                    .then(response => {
                        if (response.status === 200) {
                            this.tm4jProjects = response.data.tm4jProjects;
                        }
                    })
            },
            _getGitProjects() {
                getGitProjects()
                    .then(response => {
                        if (response.status === 200) {
                            this.gitProjects = response.data.gitProjects;
                        }
                    })
            },
            _getGitRepos() {
              getGitRepos(this.gitTargetProject)
                .then(gitRepos => {
                  this.gitRepos = gitRepos.data.gitRepos
                })
            },
            _onSubmit() {
              let syncData = {
                id: this.id,
                syncTitle: this.syncTitle,
                tm4jSourceProject: this.tm4jSourceProject,
                gitTargetProject: this.gitTargetProject,
                gitTargetRepository: this.gitTargetRepository,
                autoSyncFlag: this.autoSyncFlag,
                users: this.userList
              };
              postSyncData(syncData)
                .then(response => {
                  console.log(response);
                  if (response.status === 201) {
                    this.$router.push('mySync');
                  } else {
                    alert("Sync " + syncData.tm4jSourceProject + " to " + syncData.gitTargetProject + "/" + syncData.gitTargetRepository + ' ' + response.data);
                  }
                });
            },
        }
    }
</script>
