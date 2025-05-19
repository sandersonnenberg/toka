<template>
  <div>
    <h2>{{ isEditMode ? 'Edit Task' : 'Create Task' }}</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Title:
        <input v-model="task.title" required />
      </label>
      <label>
        Description:
        <textarea v-model="task.description"></textarea>
      </label>
      <label>
        Due Date:
        <input type="date" v-model="formattedDueDate" required />
      </label>
      <button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import { updateTaskById, getTaskById, createTask } from '@/services/api';

export default {
  props: ['taskId', 'projectId'],
  data() {
    return {
      task: {
        title: '',
        description: '',
        dueDate: '',
      },
      isEditMode: false,
    };
  },
  computed: {
    formattedDueDate: {
      get() {
        if (!this.task.dueDate) return '';
        const date = new Date(this.task.dueDate);
        return date.toISOString().split('T')[0];
      },
      set(value) {
        this.task.dueDate = new Date(value).toISOString();
      },
    },
  },
  created() {
    if (this.taskId && this.projectId) {
      this.isEditMode = true;
      this.loadTask();
    }
  },
  methods: {
    async loadTask() {
      try {
        const fetchedTask = await getTaskById(this.projectId, this.taskId);
        this.task = fetchedTask;
      } catch (error) {
        console.error(error.message);
      }
    },
    async handleSubmit() {
      try {
        if (this.isEditMode) {
          await updateTaskById(this.projectId, this.taskId, this.task);
        } else {
          await createTask(this.projectId, this.task);
        }
        this.$router.push('/tasks');
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>
