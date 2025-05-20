<template>
  <div class="empty-state">
    <p class="message">{{ message }}</p>
    <button v-if="showButton" class="btn-primary" @click="$emit('add')">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    message: { type: String, required: true },
    buttonText: { type: String, default: 'Add' },
    showButton: { type: Boolean, default: true },
  },
};
</script>

<style scoped lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px dashed #ccc;
  text-align: center;

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .message {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 1rem;
  }

  .btn-primary {
    background-color: #4a90e2;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: darken(#4a90e2, 10%);
    }
  }
}
</style>
