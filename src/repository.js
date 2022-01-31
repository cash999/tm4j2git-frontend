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

export function getMySync() {
  return axios.get('/sync/getMySync',
    {
      headers: authHeader()
    })
}
export function getTm4jConnectivityErrors() {
  return axios.get('/sync/getTm4jConnectivityErrors',
    {
      headers: authHeader()
    })
}

export function getGitConnectivityErrors() {
  return axios.get('/sync/getGitConnectivityErrors',
    {
      headers: authHeader()
    })
}

export function postSyncData(syncData) {
  return axios.post('/sync/postEditMysync',
      syncData,
    {
      headers: authHeader(),
    })
}


export function postRemoveSync(syncData) {
  return axios.post('/sync/postRemoveSync',
    syncData,
    {
      headers: authHeader(),
    })
}

export function getAdministrators() {
  return axios.get('/admin/getAdminUserList',
    {
      headers: authHeader()
    })
}

export function getSyncInterval() {
  return axios.get('/admin/getSyncInterval',
    {
      headers: authHeader()
    })
}

export function getSyncLogHoldTime() {
  return axios.get('/admin/getSyncLogHoldTime',
    {
      headers: authHeader()
    })
}

export function getErrorLogHoldTime() {
  return axios.get('/admin/getErrorLogHoldTime',
    {
      headers: authHeader()
    })
}

export function getUserNameSA() {
  return axios.get('/admin/getUserNameSA',
    {
      headers: authHeader()
    })
}

export function getPasswordSA() {
  return axios.get('/admin/getPasswordSA',
    {
      headers: authHeader()
    })
}

export function getPrivateSSHKey() {
  return axios.get('/admin/getPrivateSSHKey',
    {
      headers: authHeader()
    })
}

export function getPublicSSHKey() {
  return axios.get('/admin/getPublicSSHKey',
    {
      headers: authHeader()
    })
}

export function getJiraBaseURL() {
  return axios.get('/admin/getJiraBaseURL',
    {
      headers: authHeader()
    })
}

export function getGitBaseURL() {
  return axios.get('/admin/getGitBaseURL',
    {
      headers: authHeader()
    })
}

export function postAdminData(adminData) {
  return axios.post('/admin/saveAdminSettings',
    adminData,
    {
      headers: authHeader(),
    })
}

export function getSyncs() {
  return axios.get('/logs/getmysynclogs',
    {
      headers: authHeader()
    })
}

export function getSyncLog(syncName) {
  return axios.post('/logs/synclogs',
    syncName,
    {
      headers: authHeader()
    })
}

export function getErrorLog() {
  return axios.get('/logs/errorlogs',
    {
      headers: authHeader()
    })
}

export function getIsAdmin() {
  return JSON.parse(localStorage.getItem('userData'));
}

export function getRunSync( eMySync ) {
  console.log('runSync',JSON.stringify( eMySync));
  //{runsync: await JSON.stringify(runsync), ismanual: false}
  return axios.post('/runmanualsync/run',
     {
       runsync: JSON.stringify(eMySync), ismanual: true
    },
    {
      headers: authHeader()
    })
}
