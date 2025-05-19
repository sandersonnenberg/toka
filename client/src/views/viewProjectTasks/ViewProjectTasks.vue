<template>
  <div>
    <h2>Tasks for Project: {{ projectName }}</h2>
    <router-link :to="{ name: 'TaskCreate' }">
      <button>Add Task</button>
    </router-link>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
        <button @click="editTask(task.id)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTasksByProjectId } from '@/services/api';
import { mapGetters } from 'vuex';

export default {
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
    // goToCreateTask() {
    //   this.$router.push({ name: 'CreateTask', params: { id: this.projectId } });
    // },
    // editTask(taskId) {
    //   this.$router.push({ name: 'EditTask', params: { id: this.projectId, taskId } });
    // },
  },
};
</script>
