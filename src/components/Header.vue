<template>
    <ul class="nav nav-pills">
      <li>
        <router-link to="/" active-class="active" exact><a>Home</a></router-link>
      </li>
      <li v-if="!isAuth">
        <router-link to="/login" active-class="active"><a>Login</a></router-link>
      </li>
      <li v-if="isAuth">
        <router-link to="/addSync" active-class="active"><a>Add sync</a></router-link>
      </li>
      <li v-if="isAuth">
        <router-link to="/mySync" active-class="active"><a>My sync</a></router-link>
      </li>
      <li v-if="isAdmin && isAuth">
        <router-link to="/admin" active-class="active"><a>Admin</a></router-link>
      </li>
      <li v-if="isAuth">
        <router-link to="/logs" active-class="active"><a>Logs</a></router-link>
      </li>
      <li v-if="isAuth">
        <router-link to="/logout" active-class="active"><a>Logout</a></router-link>
      </li>
    </ul>
</template>

<script>
  import { bus } from '../main';
  export default {
    data () {
      bus.$on('loggedIn', (userData) => {
        this.isAuth = userData.isLoggedIn;
        this.isAdmin = userData.isAdmin;
      });
      bus.$on('loggedOut', () => {
        this.isAuth = false;
        this.isAdmin = false;
      });
      return {
        isAuth: this.isAuth,
        isAdmin: this.isAdmin
      }
    }
  }
</script>
