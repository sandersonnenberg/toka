<template>
  <div class="task-form-container">
    <h2>{{ isEditMode ? 'Edit Task' : 'Create Task' }}</h2>

    <form class="form-card" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="dueDate">Due Date</label>
        <input id="dueDate" type="date" v-model="formattedDueDate" required />
      </div>

      <div v-if="isEditMode" class="form-group">
        <label for="state">State</label>
        <select id="state" v-model="task.state" required>
          <option value="" disabled>Select state</option>
          <option value="CREATED">Created</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <button type="submit" class="btn-primary" :disabled="!isFormValid">
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
        const fetchedTask = await getTaskById(this.taskId);
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
          await updateTaskById(this.taskId, this.task);
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

<style scoped lang="scss">
.task-form-container {
  h2 {
    padding: 0;
    margin: 0 2rem;
    color: #333;
    margin-bottom: 2rem;
  }
}

.form-card {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  background: #fff;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  input,
  select {
    padding: 0.75rem 0;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s;

    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
}

.btn-primary {
  align-self: flex-end;
  background-color: #4a90e2;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken(#4a90e2, 10%);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
}
</style>
