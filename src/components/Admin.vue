<template>
    <div>
        <h1>This is the admin page</h1>
        <hr>
        <button @click="navigateToLogin" class="btn btn-primary">Go to Login</button>
        <hr>
        <router-view></router-view>
    </div>
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
