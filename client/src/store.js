import Vue from 'vue';
import Vuex from 'vuex';
import { getProjects, deleteProjectById } from './services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects: [],
    tasks: [],
  },
  mutations: {
    setProjects(state, projects) {
      state.projects = projects;
    },
    removeProject(state, projectId) {
      state.projects = state.projects.filter((p) => p._id !== projectId);
    },
    addProject(state, newProject) {
      state.projects.push(newProject);
    },
    updateProject(state, updatedProject) {
      const index = state.projects.findIndex((p) => p._id === updatedProject._id);
      if (index !== -1) {
        state.projects.splice(index, 1, updatedProject);
      }
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter((t) => t._id !== taskId);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((t) => t._id === updatedTask._id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
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
    addProject({ commit }, newProject) {
      commit('addProject', newProject);
    },
    removeProject({ commit }, projectId) {
      commit('removeProject', projectId);
    },
    updateProject({ commit }, updatedProject) {
      commit('updateProject', updatedProject);
    },
    addTask({ commit }, task) {
      commit('addTask', task);
    },
    removeTask({ commit }, taskId) {
      commit('removeTask', taskId);
    },
    updateTask({ commit }, task) {
      commit('updateTask', task);
    },
  },
  getters: {
    projects: (state) => state.projects,
    getProjectById: (state) => (id) => state.projects.find((p) => p._id === id),
    getTasksByProjectId: (state) => (projectId) =>
      state.tasks.filter((task) => task.projectId === projectId),
  },
});
