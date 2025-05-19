export default {
  computed: {
    projects() {
      return this.$store.getters.projects;
    }
  },
  created() {
    this.$store.dispatch('fetchProjects');
  }
};