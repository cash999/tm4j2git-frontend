import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';
import axios from 'axios';
import Vuelidate from 'vuelidate/';

export const bus = new Vue();

import * as synctractor from 'synctractor/dist/index.js';
synctractor.init();
synctractor.monitorFetch();
synctractor.monitorTimeout((_, t) => t !== 11000);

if (window.location.hostname === 'localhost') {
  axios.defaults.baseURL = 'http://localhost:3001';
} else if (window.location.hostname === 'tm4j2git-dev.scapp-corp.swisscom.com') {
  axios.defaults.baseURL = 'https://tm4j2gitbackend-dev.scapp-corp.swisscom.com';
} else if (window.location.hostname === 'tm4j2git.scapp-corp.swisscom.com') {
  axios.defaults.baseURL = 'https://tm4j2gitbackend.scapp-corp.swisscom.com';
}

Vue.use(Vuelidate);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
