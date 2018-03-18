<template>
  <div class="time-clock">
    <div v-if="loggedIn">
      <label class="switch">
        <input type="checkbox" v-model="clockIn" v-on:click="punch">>
        <span class="slider"></span>
      </label>
      <div v-if="clockIn">
        <p>You are punched in.</p>
      </div>
      <div v-else>
        <p>You are clocked out.</p>
      </div>
    </div>
    <div v-else>
      <p>You must be logged in to use the timeclock.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeClock',
  data () {
    return {
      clockIn: false,
      msg: 'Punch in or out',
    }
  },
  computed: {
    loggedIn: function() {
      return this.$store.getters.user != null;
    }
  },
  created: function() {
    this.clockIn = this.$store.getters.openPunch != null;
  },
  methods: {
    punch: function() {
      this.$store.dispatch('addPunch', new Date());
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .switch {
   margin-top: 50px;
   position: relative;
   display: inline-block;
   width: 350px;
   height: 160px;
   border-radius: 25px;
 }
 .switch input {
   display:none;
 }
 .slider {
   position: absolute;
   cursor: grabbing;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   border-radius: 15px;
   background-color: #379683;
   -webkit-transition: .4s;
   transition: .4s;
 }
 .slider:before {
   border-radius: 10px;
   position: absolute;
   padding: 51px 0;
   content: "Punch";
   font-family: "Concert One", cursive;
   font-size: 3em;
   text-transform: uppercase;
   text-align: center;
   width: 180px;
   left: 6px;
   bottom: 6px;
   background-color: #5cdb95;
   -webkit-transition: .4s;
   transition: .4s;
 }
 input:checked + .slider {
   background-color: #edf5e1;
 }
 input:focus + .slider {
   box-shadow: 0 0 1px #edf5e1;
 }
 input:checked + .slider:before {
   -webkit-transform: translateX(158px);
   -ms-transform: translateX(158px);
   transform: translateX(158px);
 }
</style>
