<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="user">Username</label>
      <input
        type="text"
        class="form-control"
        id="user"
        placeholder="Jira username"
        @input="$v.user.$touch()"
        v-model="user">
      <small id="usertext" class="form-text text-muted">We'll never share your username with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        placeholder="Jira password"
        @input="$v.password.$touch()"
        v-model="password">

      <small id="pwtext" class="form-text text-muted">We'll never share your password with anyone else.</small>
    </div>
    <button class="btn btn-primary" type="submit" id="loginSubmitButton" :disabled="$v.$invalid">Login</button>
  </form>

</template>

<script>
    import axios from 'axios';
    import {bus} from '../main';
    import {required} from 'vuelidate/lib/validators';
    export default {
        data() {
            return {
                user: '',
                password: ''
            }
        },
        validations: {
            user: {
                required
            },
            password: {
                required
            }
        },

        methods: {
            onSubmit() {
                axios.post('/auth/login',
                    {
                        user: this.user,
                        password: this.password,
                        json: true
                    })
                    .then(response => {
                        const status = response.status;
                        //save userData token in local storage
                        localStorage.setItem('userData', JSON.stringify(response.data));
                         //redirect logic
                        if (status === 200) {
                          bus.$emit('loggedIn', response.data);
                          this.$router.push('/mysync');
                        }
                    })
                    .catch(error => {
                        alert(error)
                    })
            }
        },
    }
</script>
