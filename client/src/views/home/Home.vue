<template>
  <div>
    <div class="main-header">
      <h1>Projects</h1>
      <router-link to="/projects/new"><button>Create a new Project</button></router-link>
    </div>
    <ProjectsGrid
      :items="projects"
      actionLabel="Edit"
      :linkBuilder="projectLink"
      @project-deleted="handleProjectDeleted"
    />
  </div>
</template>

<script>
import ProjectsGrid from '@/components/ProjectsGrid/ProjectsGrid.vue';

export default {
  components: { ProjectsGrid },

  computed: {
    projects() {
      return this.$store.getters.projects;
    },
  },
  methods: {
    projectLink(project) {
      return `/projects/${project._id}/edit`;
    },
    handleProjectDeleted(deletedId) {
      this.$store.dispatch('deleteProject', deletedId);
    },
  },
  created() {
    this.$store.dispatch('fetchProjects');
  },
};
</script>
