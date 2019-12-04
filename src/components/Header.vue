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
      return {
        isAuth: this._isAuth(),
        isAdmin: this._isAdmin()
      }
    },
    created() {
      bus.$on('loggedIn', () => {
        this.isAuth = this._isAuth();
        this.isAdmin = this._isAdmin();
      });
      bus.$on('loggedOut', () => {
        this.isAuth = this._isAuth();
        this.isAdmin = this._isAdmin();
      })
    },
    methods: {
      _isAdmin () {
        let userData = JSON.parse(localStorage.getItem('userData'));
        if (userData !== null) {
          if (userData.isAdmin) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      _isAuth () {
        let userData = JSON.parse(localStorage.getItem('userData'));
        if (userData !== null) {
          if (userData.isLoggedIn) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      },
      xxx(){
        console.log("exiiiiit");
      }
    }
  }
</script>
