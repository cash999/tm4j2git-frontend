<template>
  <form @submit.prevent="onSubmit">
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
        v-on:change="getGitRepos"
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
    <button class="btn btn-primary" type=submit :disabled="$v.$invalid">Save</button>
  </form>
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
                autoSyncFlag: false
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
            this.getGitProjects()
        },
        methods: {
            getTm4Projects() {
                axios.get('/sync/getTm4jProjects',
                    {
                      headers: authHeader(),
                      params: {
                        json: true
                      }
                    })
                    .then(response => {
                        if (response.status === 200) {
                            console.log(response.status);
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
                      headers: authHeader(),
                      params: {
                        json: true
                      }
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
