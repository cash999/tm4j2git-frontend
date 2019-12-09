import axios from 'axios';
import {authHeader} from "./authentication/auth-header";

export function getTm4jProjects() {
  return axios.get('/sync/getTm4jProjects',
    {
      headers: authHeader()
    })
}

export function getGitProjects() {
  return axios.get('/sync/getGitProjects',
    {
      headers: authHeader()
    })
}

export function getGitRepos(gitTargetProject) {
  return axios.get('/sync/getGitRepos',
    {
      headers: authHeader(),
      params: {
        gitProject: gitTargetProject,
        json: true
      }
    })
}

export function postSyncData(syncData) {
  return axios.post('/sync/addSync',
      syncData,
    {
      headers: authHeader(),
    })
}
