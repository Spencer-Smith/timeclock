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
        <div class="punch">
          <p>Punch in</p>
          <p>Punch out</p>
          <p>Time worked</p>
        </div>
      </div>
      <div v-for='punch in filteredPunches' class="punch">
        <p>{{ prettyDate(punch.punch_in) }}</p>
        <p>{{ prettyDate(punch.punch_out) }}</p>
        <p>{{ ((new Date(punch.punch_out) - new Date(punch.punch_in))/1000/60) }}</p>
      </div>
    </div>
    <div v-else>
      <p>You must be logged in to view reports.</p>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'Reports',
   data () {
     return {
       punches: [],
       window: '',
     }
   },
   computed: {
     loggedIn: function() {
       return this.$store.getters.isLoggedIn;
     },
     filteredPunches: function() {
       if (this.window === '')
         return [];
       let fp = [];
       for (let i=0; i < this.punches.length; i++) {
         let punch = this.punches[i];
         let outPunch = new Date(punch.punch_out);
         let now = new Date();
         let millis = now - outPunch;
         let timePassed = Math.floor(millis/60000);
         if(this.window === 'day') {
           if (timePassed < 1440)
             fp.push(punch);
         }
         else if(this.window === 'week') {
           if (timePassed/60/24 < 7)
             fp.push(punch);
         }
         else if(this.window === 'month') {
           if (timePassed/60/24 < 30)
             fp.push(punch);
         }
         else if(this.window === 'year') {
           if (timePassed/60/24 < 365)
             fp.push(punch);
         }
         else
           return [];
       }
       console.log("Filtered punches: ", fp);
       return fp;
     },
     timeIn: function() {
       let timeIn = 0;
       for (let i = 0; i < this.filteredPunches.length; i++) {
         let punch = this.filteredPunches[i];
         timeIn += (new Date(punch.punch_out) - new Date(punch.punch_in));
       }
       // Convert to minutes
       timeIn /= 1000;
       timeIn /= 60;
       return Math.round(timeIn);
     }
   },
   created: function() {
     let punches = this.$store.getters.punches;
     if (punches != null)
       this.punches = punches;
   },
   methods: {
     setWindow: function(setting) {
       console.log("Setting window...");
       this.window = setting;
     },
     prettyDate: function(d) {
       let date = new Date(d);
       let s = (date.getMonth() + 1) + "/" + date.getDate();
       let min = date.getMinutes();
       if (min < 10)
         min = "0" + min;
       s += "  " + date.getHours() + ":" + min;
       return s;
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
