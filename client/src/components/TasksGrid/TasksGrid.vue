<template>
  <div class="task-columns">
    <div class="task-column">
      <h3>Created</h3>
      <TaskCard
        v-for="item in createdTasks"
        :key="item._id"
        :item="item"
        :editLink="generateLink(item)"
        :type="detectType(item)"
        @project-deleted="removeProject"
      />
    </div>
    <div class="task-column">
      <h3>In Progress</h3>
      <TaskCard
        v-for="item in inProgressTasks"
        :key="item._id"
        :item="item"
        :editLink="generateLink(item)"
        :type="detectType(item)"
        @project-deleted="removeProject"
      />
    </div>
    <div class="task-column">
      <h3>Completed</h3>
      <TaskCard
        v-for="item in completedTasks"
        :key="item._id"
        :item="item"
        :editLink="generateLink(item)"
        :type="detectType(item)"
        @project-deleted="removeProject"
      />
    </div>
  </div>
</template>

<script>
import { taskStates } from '@/constants';
import TaskCard from '../TaskCard/TaskCard.vue';

export default {
  components: { TaskCard },
  props: {
    items: { type: Array, required: true },
    actionLabel: { type: String, default: 'View' },
    linkBuilder: { type: Function, required: true },
  },
  computed: {
    createdTasks() {
      return this.items.filter((item) => item.state === taskStates.CREATED);
    },
    inProgressTasks() {
      return this.items.filter((item) => item.state === taskStates.IN_PROGRESS);
    },
    completedTasks() {
      return this.items.filter((item) => item.state === taskStates.COMPLETED);
    },
  },
  methods: {
    generateLink(item) {
      return this.linkBuilder(item);
    },
    detectType(item) {
      return item.projectId ? 'task' : 'project';
    },
    removeProject(deletedId) {
      this.projects = this.projects.filter((p) => p._id !== deletedId);
    },
  },
};
</script>

<style scoped lang="scss">
.task-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.task-column {
  flex: 1;
  min-width: 280px;
  background-color: #f8f8f8;
  padding: 8px;
  border-radius: 6px;

  h3 {
    margin-bottom: 12px;
    font-size: 1.1rem;
    text-align: center;
  }
}
</style>
