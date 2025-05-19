<template>
  <EntityFormView
    title="Create Project"
    submitLabel="Create"
    :saveEntity="saveEntity"
    redirectPath="/projects"
  />
</template>

<script>
import EntityFormView from '@/views/entityFormView/EntityFormView.vue';
import { createProject } from '@/services/api';

export default {
  components: { EntityFormView },
  computed: {
    saveEntity() {
      return (data) => {
        createProject(data);
      };
    },
  },
};
</script>
