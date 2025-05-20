<template>
  <div>
    <div class="main-header">
      <h2>Tasks for Project: {{ projectId }}</h2>
      <router-link :to="{ name: 'TaskCreate' }">
        <button class="add-task">Add Task</button>
      </router-link>
    </div>
    <div v-if="tasks.length > 0">
      <TasksGrid
        :items="tasks"
        actionLabel="Edit"
        :linkBuilder="tasksLink"
        @task-deleted="removeTask"
      />
    </div>

    <EmptyState
      v-else
      message="There are no tasks for this project. Please add one."
      button-text="Add Task"
      @add="goToCreateTask"
    />
  </div>
</template>

<script>
import TasksGrid from '@/components/TasksGrid/TasksGrid.vue';
import EmptyState from '@/components/EmptyState/EmptyState.vue';
import { getTasksByProjectId } from '@/services/api';
import { mapGetters } from 'vuex';

export default {
  components: { TasksGrid, EmptyState },
  data() {
    return {
      projectId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters(['getTasksByProjectId']),
    tasks() {
      return this.getTasksByProjectId(this.projectId);
    },
  },
  methods: {
    async fetchTasks() {
      try {
        this.tasks = await getTasksByProjectId(this.projectId);
      } catch (error) {
        console.error(error.message);
      }
    },
    removeTask(deletedId) {
      this.$store.dispatch('removeTask', deletedId);
    },
    tasksLink(task) {
      return {
        name: 'TaskEdit',
        params: { id: this.projectId, taskId: task._id },
      };
    },
    goToCreateTask() {
      this.$router.push({ name: 'TaskCreate' });
    },
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
