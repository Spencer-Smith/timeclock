<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="username" placeholder="Enter your username">
    <input type="password" v-model="password" placeholder="Enter your password">
    <p v-show="hasError" class="error">{{ error }}<p>
    <div class="buttonrow">
      <div class="button" v-on:click="login">Login</div>
      <div class="button" v-on:click="register">Register</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login',
      error: '',
      username: '',
      password: '',
    }
  },
  computed: {
    hasError: function() {
      if (this.error === '')
        return false;
      return true;
    }
  },
  methods: {
    login: function() {
      if (this.username === '') {
        this.error = 'You cannot have an empty username';
        return;
      }
      if (this.password === '') {
        this.error = 'You cannot have an empty password';
        return;
      }
      this.$store.dispatch('login', [this.username, this.password])
      .then(response => {
        this.$router.push('/');
        }, error => {
        this.error = error.message;
      });
    },
    register: function() {
      if (this.username === '') {
        this.error = 'You cannot have an empty username';
        return;
      }
      if (this.password === '') {
        this.error = 'You cannot have an empty password';
        return;
      }
      this.$store.dispatch('register', [this.username, this.password])
      .then(success => {
        this.$router.push('/');
        }, error => {
        this.error = error.message;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 p {
   font-size: 0.7em;
 } 
 input {
   display: block;
   margin: 12px auto; 
   font-size: 1.4em;
 }
 input[type=text], input[type=password] {
   padding: 2px 8px;
   background: none;
   border: none;
   border-bottom: 1px solid #05386b;
   color: #edf5e1;
 }
 .buttonrow {
    width: 300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
 .button {
   width: 80px;
   height: 20px;
   line-height: 10px;
   padding: 10px 20px;
   color: #edf5e1;
   margin: 25px auto;
   font-family: 'Concert One', cursive;
   font-size: 1.2em;
   text-align: center;
   text-decoration: none;
   text-transform: uppercase;
   border-radius: 8px;
   background: #f13c20;
   cursor: pointer;
 }
 .button:hover {
   background: #c11c00;
 }
 .error {
   font-size: 1em;
   color: red;
 }
</style>
