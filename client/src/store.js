import Vue from 'vue';
import Vuex from 'vuex';
import { getProjects, deleteProjectById } from './services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    removeProject(state, projectId) {
      //check
      state.projects = state.projects.filter((p) => p._id !== projectId);
    },
  },
  actions: {
    async fetchProjects({ commit }) {
      try {
        const projects = await getProjects();
        commit('setProjects', projects);
      } catch (error) {
        console.error(error.message);
      }
    },
    async deleteProject({ commit }, projectId) {
      try {
        await deleteProjectById(projectId);
        commit('removeProject', projectId);
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    },
  },
  getters: {
    projects: (state) => state.projects,
    getProjectById: (state) => (id) => state.projects.find((p) => p.id === id),
  },
});
