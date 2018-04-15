import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    openPunch: null,
    punches: null, 
  },
  getters: {
    user: state => state.user,
    openPunch: state => state.openPunch,
    punches: state => state.punches,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setPunch(state, punch) {
      state.openPunch = punch;
    },
    setPunches(state, punches) {
      console.log("set punches: ", punches);
      state.punches = punches;
    },
  },
  actions: {
    //--Login--//
    register(context, [username, password]) {
      return new Promise((resolve, reject) => {
        axios.post("/api/user", { username:username, password:password })
        .then(response => {
          context.commit('setUser', response.data.user);
          context.dispatch('getPunches');
          resolve({success: true});
        }).catch(err => {
          reject({success: false, message: err.response.data});
        });
      });
    },
    login(context, [username, password]) {
      return new Promise((resolve, reject) => {
        axios.post("/api/user/login", { username:username, password:password })
        .then(response => {
          context.commit('setUser', response.data.user);
          context.dispatch('getPunches');
          resolve({success: true});
        }).catch(err => {
          console.log(err);
          reject({success: false, message: err.response.data});
        });
      });
    },
    logout(context) {
      context.commit('setUser', null);
    },
    //--Punches--//
    addPunch(context, time) {
      let punch = this.getters.openPunch;
      // This is a punch out
      if (punch != null) {
        punch.punch_out = time;
        axios.post("/api/punch/", { id:this.getters.user.id, punch:punch })
        .then(response => {
          context.commit('setPunch', null);
          context.dispatch('setPunches', response.data.punches);
        }).catch(err => {
          console.log(err);
        });
      }
      // This is a punch in
      else {
        punch = { punch_in:time };
        context.commit('setPunch', punch);
      }
    },
    getPunches(context) {
      let id = context.getters.user.id;
      axios.get('/api/user/' + id + "/punch").then(response => {
        console.log("response: ", response);
        console.log("punches: ", response.data.punches);
        context.commit('setPunches', response.data.punches);
      }).catch(err => {
        console.log(err);
      });
    }, 
  }
});
