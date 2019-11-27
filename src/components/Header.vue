<template>
    <ul class="nav nav-pills">
      <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
      <router-link to="/login" tag="li" active-class="active"><a>Login</a></router-link>
      <router-link to="/addSync" tag="li" active-class="active"><a>Add sync</a></router-link>
      <router-link to="/mySync" tag="li" active-class="active"><a>My sync</a></router-link>
      <router-link to="/admin" tag="li" active-class="active"><a>Admin</a></router-link>
      <router-link to="/logout" tag="li" active-class="active"><a>Logout</a></router-link>

      <!--      <li>-->
      <!--        <router-link to="/" active-class="active" exact><a>Home</a></router-link>-->
      <!--      </li>-->
      <!--      <li v-if="isAuth === false">-->
      <!--        <router-link to="/login" active-class="active"><a>Login</a></router-link>-->
      <!--      </li>-->
      <!--      <li v-if="isAuth===true">-->
      <!--        <router-link to="/addSync" active-class="active"><a>Add sync</a></router-link>-->
      <!--      </li>-->
      <!--      <li v-if="isAuth">-->
      <!--        <router-link to="/mySync" active-class="active"><a>My sync</a></router-link>-->
      <!--      </li>-->
      <!--      <li v-if="isAdmin && isAuth">-->
      <!--        <router-link to="/admin" active-class="active"><a>Admin</a></router-link>-->
      <!--      </li>-->
      <!--      <li v-if="isAuth">-->
      <!--        <router-link to="/logout" active-class="active"><a>Logout</a></router-link>-->
      <!--      </li>-->
    </ul>
</template>

<script>
  export default {
    data () {
      return {
        isAuth: this._isAuth(),
        isAdmin: this._isAdmin()
      }
    },
    created() {
      this.isAuth = this._isAuth();
      this.isAdmin = this._isAdmin();
    },
    methods: {
      _isAdmin () {
        let userData = JSON.parse(localStorage.getItem('userData'));
        if (userData !== null) {
          if (userData.isAdmin) {
            console.log("isAdmin " + userData.isAdmin);
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
            console.log("isLoggedIn " + userData.isLoggedIn);
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }
</script>
