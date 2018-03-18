import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    openPunch: null,
  },
  getters: {
    user: state => state.user,
    openPunch: state => state.openPunch,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setPunch(state, punch) {
      state.openPunch = punch;
    },
  },
  actions: {
    register(context, [username, password]) {
      return new Promise((resolve, reject) => {
        axios.post("/api/user/", { username:username, password:password })
        .then(response => {
          context.commit('setUser', response.data);
          resolve({success: true});
        }).catch(err => {
          reject({success: false, message: err.response.data});
        });
      });
    },
    login(context, [username, password]) {
      return new Promise((resolve, reject) => {
        axios.get("/api/user/" + username + "/" + password).then(response => {
          context.commit('setUser', response.data);
          resolve({success: true});
        }).catch(err => {
          console.log(err);
          reject({success: false, message: err.response.data});
        });
      });
    },
    getUser(context) {
      let username = this.getters.user.username;
      let password = this.getters.user.password;
      axios.get("/api/user/" + username + "/" + password).then(response => {
        context.commit('setUser', response.data);
      }).catch(err => {
        console.log(err);
      });
    },
    logout(context) {
      context.commit('setUser', null);
    },
    addPunch(context, time) {
      let punch = this.getters.openPunch;
      // This is a punch out
      if (punch != null) {
        punch.OUT = time;
        axios.post("/api/punch/", { user:this.getters.user,
         punch:punch}).then(response=> {
          context.commit('setPunch', null);
          context.dispatch('getUser');
        }).catch(err => {
          console.log(err);
        });
      }
      // This is a punch in
      else {
        punch = { IN:time };
        context.commit('setPunch', punch);
      }
    },
  }
});
