import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';
import axios from 'axios';
import Vuelidate from 'vuelidate/';
export const bus = new Vue();

axios.defaults.baseURL ='http://localhost:3000';

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
