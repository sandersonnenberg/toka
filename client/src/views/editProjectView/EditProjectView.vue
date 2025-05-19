<template>
  <EntityFormView
    title="Edit Project"
    submitLabel="Update"
    :fetchEntity="fetchEntity"
    :saveEntity="saveEntity"
    redirectPath="/projects"
  />
</template>

<script>
import EntityFormView from '@/views/entityFormView/EntityFormView.vue';
import { getProjectById, updateProjectById } from '@/services/api';

export default {
  components: { EntityFormView },
  computed: {
    fetchEntity() {
      return () => getProjectById(this.$route.params.id);
    },
    saveEntity() {
      return (data) => updateProjectById(this.$route.params.id, data);
    },
  },
};
</script>
