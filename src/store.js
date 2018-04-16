import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'; 
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    openPunch: null,
    punches: [], 
  },
  getters: {
    user: state => state.user,
    isLoggedIn: state => state.loggedIn,
    openPunch: state => state.openPunch,
    isPunchedIn: state => () => {
      if (openPunch == null)
        return true;
      return false;
    },
    punches: state => state.punches,
  },
  mutations: {
    setUser (state, user) {
      console.log('setUser', user);
      state.user = user;
    },
    setLoggedIn (state, is) {
      state.loggedIn = is;
    },
    setPunch (state, punch) {
      state.openPunch = punch;
    },
    setPunches (state, punches) {
      console.log('setPunches', punches);
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
          context.commit('setLoggedIn', true);
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
          context.commit('setLoggedIn', true);
          context.dispatch('getPunches');
          resolve({success: true});
        }).catch(err => {
          console.log(err);
          reject({success: false, message: err.response.data});
        });
      });
    },
    logout(context) {
      context.commit('setUser', {});
      context.commit('setLoggedIn', false);
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
          context.dispatch('getPunches');
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
      axios.get("/api/user/" + id + "/punch").then(response => {
        context.commit('setPunches', response.data.punches);
      }).catch(err => {
        console.log(err);
      });
    }, 
  }
});
