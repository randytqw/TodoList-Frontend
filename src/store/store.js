import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = "http://localhost:3000/";

export default new Vuex.Store({
  state: {
    tasks: []
  },
  actions: {
    loadTasks({commit}) {
      Vue.axios.get('tasks').then(result => {
        console.log(result.data);
        commit('SAVE_TASKS', result.data);
      }).catch(error => {
        console.log(error);
      });
    }
  },
  mutations: {
    SAVE_TASKS(state, users) {
      state.tasks = users;
    }
  }
})