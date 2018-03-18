<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <i id="fist" class="fa fa-hand-grab-o"></i>
    <i id="clock" class="fa fa-clock-o"></i>
    <p>TimePunch is a service for keeping track of your time punches</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to TimePunch'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #fist {
   color: #05386b;
   font-size: 16em;
   transform: rotate(90deg);
 }
 #clock {
   color: #05386b;
   font-size: 16em;
 }
</style>
