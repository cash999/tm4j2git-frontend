<template>
  <form>
    <div>
      <h1>This is the mysync page</h1>
      <hr>


      <button @click="navigateToLogin" class="btn btn-primary">Go to Login</button>
      <hr>
      <router-view></router-view>
    </div>
  </form>
</template>


<script>
    export default {
        methods: {
            navigateToLogin() {
                // this.$router.push({ name: 'home' });
                this.$router.push('/');
            }
        }
    }
</script>
