<template>
  <div class="reports">
    <div v-if="loggedIn" class="content">
      <div class="buttonrow">
        <div class="button" v-on:click='setWindow("day")'>Daily</div>
        <div class="button" v-on:click='setWindow("week")'>Weekly</div>
        <div class="button" v-on:click='setWindow("month")'>Monthly</div>
        <div class="button" v-on:click='setWindow("year")'>Yearly</div>
      </div>
      <div v-if='filteredPunches.length > 0'>
        <p>You've worked for {{timeIn}} minutes in the past {{window}}.</p>
      </div>
      <div v-for='punch in filteredPunches' class="punch">
        <p>{{ punch.IN }}</p>
        <p>{{ punch.OUT }}</p>
        <p>{{ ((new Date(punch.OUT)-newDate(punch.IN))/1000/60) }}</p>
      </div>
    </div>
    <div v-else>
      <p>You must be logged in to view reports.</p>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'TimeClock',
   data () {
     return {
       punches: [],
       window: '',
     }
   },
   computed: {
     loggedIn: function() {
       return this.$store.getters.user != null;
     },
     filteredPunches: function() {
       if (this.window === '')
         return [];
       console.log("Filtering...");
       let fp = [];
       for (let i=0; i < this.punches.length; i++) {
         let punch = this.punches[i];
         let outPunch = new Date(punch.OUT);
         let now = new Date();
         let millis = now - outPunch;
         console.log(millis);
         let timePassed = Math.floor(millis/60000);
         console.log("Minutes passed: " + timePassed);
         if(this.window === 'day') {
           console.log("...by day");
           if (timePassed < 1440)
             fp.push(punch);
         }
         else if(this.window === 'week') {
           console.log("...by week");
           if (timePassed/60/24 < 7)
             fp.push(punch);
         }
         else if(this.window === 'month') {
           console.log("...by month");
           if (timePassed/60/24 < 30)
             fp.push(punch);
         }
         else if(this.window === 'year') {
           console.log("...by year");
           if (timePassed/60/24 < 365)
             fp.push(punch);
         }
         else
           return [];
       }
       return fp;
     },
     timeIn: function() {
       let timeIn = 0;
       for (let i = 0; i < this.filteredPunches.length; i++) {
         let punch = this.filteredPunches[i];
         timeIn += (new Date(punch.OUT) - new Date(punch.IN));
       }
       // Convert to minutes
       timeIn /= 1000;
       timeIn /= 60;
       return Math.round(timeIn);
     }
   },
   created: function() {
     let user = this.$store.getters.user;
     if (user != null)
       this.punches = user.punches;
   },
   methods: {
     punch: function() {
       this.$store.dispatch('addPunch', new Date());
     },
     setWindow: function(setting) {
       console.log(setting);
       this.window = setting;
     },
   },
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .content {
   margin: 20px auto;
   width: 800px;
 }
 .punch {
   display: flex;
   justify-content: space-between;
 }
 .buttonrow {
   width: 80%;
   margin: 0 auto;
   display: flex;
   justify-content: space-between;
 }
 .button {
   background: #05386b;
   font-family: "Concert One", cursive;
   font-size: 1.4em;
   color: #edf5e1;
   padding: 4px 9px;
   height: 28px;
   width: 90px;
   border-radius: 25px;
   cursor: pointer;
 }
 .button:hover {
   background: #379683;
 }
</style>
