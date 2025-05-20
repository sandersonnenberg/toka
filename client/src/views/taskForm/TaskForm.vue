<template>
  <div>
    <h2>{{ isEditMode ? 'Edit Task' : 'Create Task' }}</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Due Date:
        <input type="date" v-model="formattedDueDate" required />
      </label>

      <div v-if="isEditMode">
        <label>
          State:
          <select v-model="task.state" required>
            <option value="" disabled>Select state</option>
            <option value="CREATED">Created</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </label>
      </div>

      <button type="submit" :disabled="!isFormValid">
        {{ isEditMode ? 'Update' : 'Create' }}
      </button>
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
        dueDate: '',
      },
      isEditMode: false,
    };
  },
  computed: {
    formattedDueDate: {
      get() {
        if (!this.task.dueDate) return '';
        return new Date(this.task.dueDate).toISOString().split('T')[0];
      },
      set(value) {
        this.task.dueDate = new Date(value).toISOString();
      },
    },
    isFormValid() {
      if (!this.task.dueDate) return false;
      if (this.isEditMode && !this.task.state) return false;
      return true;
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
        this.task = {
          dueDate: fetchedTask.dueDate,
          state: fetchedTask.state || '',
        };
      } catch (error) {
        console.error('Failed to load task:', error.message);
      }
    },
    async handleSubmit() {
      try {
        if (this.isEditMode) {
          await updateTaskById(this.projectId, this.taskId, this.task);
        } else {
          await createTask(this.projectId, this.task);
        }
        this.$router.push(`/projects/${this.projectId}/tasks`);
      } catch (error) {
        console.error('Task submission failed:', error.message);
      }
    },
  },
};
</script>
