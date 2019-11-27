import Header from './components/Header.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import AddSync from './components/AddSync.vue';
import MySync from './components/MySync.vue';
import Admin from './components/Admin.vue';
// import Logout from './components/Logout.vue';


export const routes = [
  { path: '', components: {
      default: Home,
      'header-top': Header
  } },
  { path: '/login', name: 'Login', component: Login  },
  { path: '/addSync', component: AddSync  },
  { path: '/mySync', mySync: 'MySync', component: MySync  },
  { path: '/admin', component: Admin  },
  { path: '/logout', redirect: '/' },
  { path: '*', redirect: '/' }
];
