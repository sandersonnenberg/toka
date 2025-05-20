<template>
  <div>
    <h2>Tasks for Project: {{ projectName }}</h2>
    <router-link :to="{ name: 'TaskCreate' }">
      <button>Add Task</button>
    </router-link>
    <TasksGrid
      :items="tasks"
      actionLabel="Edit"
      :linkBuilder="tasksLink"
      @task-deleted="removeTask"
    />
  </div>
</template>

<script>
import TasksGrid from '@/components/TasksGrid/TasksGrid.vue';
import { getTasksByProjectId } from '@/services/api';
import { mapGetters } from 'vuex';

export default {
  components: { TasksGrid },
  data() {
    return {
      tasks: [],
      projectId: this.$route.params.id,
    };
  },
  created() {
    this.fetchTasks();
  },
  computed: {
    ...mapGetters(['getProjectById']),
    projectName() {
      const project = this.getProjectById(this.projectId);
      return project ? project.name : 'Unknown Project';
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
      this.tasks = [...this.tasks.filter((t) => t._id !== deletedId)];
    },
    tasksLink(task) {
      return {
        name: 'TaskEdit',
        params: { id: this.projectId, taskId: task._id },
      };
    },
    // goToCreateTask() {
    //   this.$router.push({ name: 'CreateTask', params: { id: this.projectId } });
    // },
    // editTask(taskId) {
    //   this.$router.push({ name: 'EditTask', params: { id: this.projectId, taskId } });
    // },
  },
};
</script>
