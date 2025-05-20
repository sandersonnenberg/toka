<template>
  <div>
    <div class="main-header">
      <h2>Projects</h2>
      <router-link to="/projects/new"><button>Create a new Project</button></router-link>
    </div>
    <div v-if="projects.length > 0">
      <ProjectsGrid
        :items="projects"
        actionLabel="Edit"
        :linkBuilder="projectLink"
        @project-deleted="handleProjectDeleted"
      />
    </div>

    <EmptyState
      v-else
      message="There are no projects. Please add some."
      button-text="Create Project"
      @add="goToCreateProject"
    />
  </div>
</template>

<script>
import ProjectsGrid from '@/components/ProjectsGrid/ProjectsGrid.vue';
import EmptyState from '@/components/EmptyState/EmptyState.vue';

export default {
  components: { ProjectsGrid, EmptyState },

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
    goToCreateProject() {
      this.$router.push('/projects/new');
    },
  },
  created() {
    this.$store.dispatch('fetchProjects');
  },
};
</script>
<style lang="scss">
.main-header {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
