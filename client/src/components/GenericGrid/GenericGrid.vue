<template>
  <div class="grid">
    <GenericCard
      v-for="item in items"
      :key="item._id"
      :item="item"
      :editLink="generateLink(item)"
      :type="detectType(item)"
    />
  </div>
</template>

<script>
import GenericCard from '../GenricCard/GenericCard.vue';

export default {
  components: { GenericCard },
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
