<template>
  <div class="grid">
    <ProjectCard
      v-for="item in items"
      :key="item._id"
      :item="item"
      :editLink="generateLink(item)"
      :type="detectType(item)"
      @project-deleted="removeProject"
    />
  </div>
</template>

<script>
import ProjectCard from '../ProjectCard/ProjectCard.vue';

export default {
  components: { ProjectCard },
  props: {
    items: { type: Array, required: true },
    actionLabel: { type: String, default: 'View' },
    linkBuilder: { type: Function, required: true },
  },
  methods: {
    generateLink(item) {
      return this.linkBuilder(item);
    },
    detectType(item) {
      return item.projectId ? 'task' : 'project';
    },
    removeProject(deletedId) {
      this.$emit('project-deleted', deletedId);
    },
  },
};
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  padding: 16px;
}
</style>
