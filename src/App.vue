<template>
  <div id="app">
    <app-header/>
    <router-view/>
  </div>
</template>

<script>
 import AppHeader from './components/AppHeader';
 export default {
   name: 'App',
   components: { AppHeader },
 }
</script>

<style>
 body {
   padding: 0;
   margin: 0;
   background: #5cdb95;
   font-family: 'Rubik', sans-serif;
 }
 h1 {
   font-family: 'Rubik', sans-serif;
   text-transform: uppercase;
 }
 #app {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   margin: 0;
   padding: 0;
 }
 a, a:active, a:focus {
   outline:none;
 }
</style>
