import Vue from "vue";
import Vuex from "vuex";
import { getProjects } from './services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: []
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    }
  },
  actions: {
    async fetchProjects({ commit }) {
      try {
        const projects = await getProjects();
        commit('setProjects', projects);
      } catch (error) {
        console.error(error.message);
      }
    }
  },
  getters: {
    projects: (state) => state.projects
  }
});
