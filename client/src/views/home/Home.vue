<template>
  <div>
    <div class="main-header">
      <h1>Projects</h1>
      <router-link to="/projects/new"><button>Create a new Project</button></router-link>
    </div>
    <GenericGrid :items="projects" actionLabel="Edit" :linkBuilder="projectLink" />
  </div>
</template>

<script>
import GenericGrid from '@/components/GenericGrid/GenericGrid.vue';

export default {
  components: { GenericGrid },

  computed: {
    projects() {
      return this.$store.getters.projects;
    },
  },
  methods: {
    projectLink(project) {
      return `/projects/${project._id}/edit`;
    },
  },
  created() {
    this.$store.dispatch('fetchProjects');
  },
};
</script>
