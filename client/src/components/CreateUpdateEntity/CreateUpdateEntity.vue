<template>
  <form class="form-card" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input id="name" v-model="form.name" required />
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" v-model="form.description" rows="4" />
    </div>

    <button type="submit" class="btn-primary" :disabled="!form.name.trim()">
      {{ submitLabel }}
    </button>
  </form>
</template>

<script>
export default {
  props: {
    initialData: { type: Object, default: () => ({ name: '', description: '' }) },
    submitLabel: { type: String, default: 'Save' },
  },
  data() {
    return { form: { ...this.initialData } };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.form);
    },
  },
};
</script>

<style scoped lang="scss">
.form-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  input,
  textarea {
    padding: 0.75rem 1rem;
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
  color: white;
  padding: 0.7rem 1.4rem;
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
