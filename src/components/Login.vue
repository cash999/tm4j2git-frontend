<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="user">Username</label>
      <input
        type="user"
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
    <button class="btn btn-primary" type="submit" :disabled="$v.$invalid">Login</button>
  </form>

</template>

<script>
    import axios from 'axios';
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
                let self = this;
                axios.post('/auth/login',
                    {
                        user: this.user,
                        password: this.password,
                        json: true
                    })
                    .then(response => {
                        const status = response.status;
                        console.log(response.status);
                         //redirect logic
                        if (status === 200) {
                            self.$router.push('/mysync');
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        // alert(error)
                    })
            }
        },
    }
</script>
