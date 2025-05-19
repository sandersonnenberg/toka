<template>
  <div>
    <h1>Projects</h1>
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
