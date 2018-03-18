<template>
  <nav>
    <ul id="menu">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/clock">Clock</router-link></li>
      <li><router-link to="/reports">Reports</router-link></li>
      <li v-if="loggedIn" class="right" v-on:click="logout"><a>Logout</a></li>
      <li v-else class="right"><router-link to="/login">Login</router-link></li>
    </ul>	
  </nav>
</template>

<script>
 export default {
   name: 'AppHeader',
   computed: {
     loggedIn: function() {
       return this.$store.getters.user != null;
     },
   },
   methods: {
     logout: function() {
       this.$store.dispatch('logout');
     }
   }
 }
</script>

<style scoped>
 .clear {
   float: clear;
 }
 nav {
   display: grid;
   width: 100%;
 }
 nav ul {
   list-style-type: none;
   margin: 0;
   padding: 10px 3px 0;
   height: 44px;
   background: #05386b;
 }
 nav li {
   display:inline-block;
   float: left;
 }
 .right {
   float: right;
 }
 nav li a {
   display: block;
   position: relative;
   top: 0px;
   background: #379683;
   border-radius: 8px 8px 0 0;
   height: 20px;
   padding: 12px 20px;
   margin: 0 2px;
   color: #edf5e1;
   font-family: 'Concert One', cursive;
   font-size: 1.2em;
   text-align: center;
   text-decoration: none;
   text-transform: uppercase;
   line-height: 7px;
 }
 nav .right a {
   height: 15px;
   line-height: 6px;
   border-radius: 8px;
   background: #f13c20;
 }
 nav li a:hover {
   top: -5px;
   height: 25px;
 }
 nav .right a:hover {
   top: 0px;
   height: 15px;
   background: #c11c00;
 }
 nav li .router-link-exact-active {
   background: #5cdb95;
 }
 nav li .router-link-exact-active.right {
 }
</style>
