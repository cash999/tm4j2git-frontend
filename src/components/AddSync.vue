<template>
  <form @submit.prevent="_onSubmit">
    <div class="form-group">
      <label for="syncTitle">Title</label>
      <input
        class="form-control"
        type="text"
        id="syncTitle"
        name="syncTitle"
        @input="$v.syncTitle.$touch()"
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
        <option value="">-- Select the JIRA project --</option>
        <option v-for="tm4jProject in tm4jProjects">
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
        <option value="">-- Select the GIT project --</option>
        <option v-for="gitProject in gitProjects">
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
    <h3>{{errorMsg}}</h3>
    <br>
    <button class="btn btn-primary" type=submit :disabled="$v.$invalid">Save</button>
  </form>
</template>

<script>
    import {required} from 'vuelidate/lib/validators';
    import {getTm4jProjects, getGitProjects, getGitRepos, postSyncData} from '../repository';

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
                autoSyncFlag: false,
                errorMsg: ''
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
            this._getTm4jProjects();
            this._getGitProjects();
        },
        methods: {
            _getTm4jProjects() {
                getTm4jProjects()
                  .then(tm4jProjects => {
                    this.tm4jProjects = tm4jProjects.data.tm4jProjects
                  })
            },
            _getGitProjects() {
                getGitProjects()
                  .then(gitProjects => {
                    this.gitProjects = gitProjects.data.gitProjects
                  })
            },
            _getGitRepos() {
                getGitRepos(this.gitTargetProject)
                  .then(gitRepos => {
                    this.gitRepos = gitRepos.data.gitRepos
                  })
            },
            _onSubmit() {
              console.log("save");
              let userData = JSON.parse(localStorage.getItem('userData'));
              let syncData = {
                  user: userData.user,
                  syncTitle: this.syncTitle,
                  tm4jSourceProject: this.tm4jSourceProject,
                  gitTargetProject: this.gitTargetProject,
                  gitTargetRepository: this.gitTargetRepository,
                  autoSyncFlag: this.autoSyncFlag
              };
              console.log(this.tm4jSourceProject);
              postSyncData(syncData)
                .then(response => {
                  if (response.status === 201) {
                    this.$router.push('mySync');
                  }
                  }, response => {
                  this.errorMsg = "Sync " + syncData.tm4jSourceProject + " to " + syncData.gitTargetProject + "/" + syncData.gitTargetRepository + " already exists!";
                })
            }
        }
    }
</script>
