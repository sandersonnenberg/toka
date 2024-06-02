import Vue from "vue";
import Vuex from "vuex";
import projects from "./views/projects/projects.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    projects,
  },
});
