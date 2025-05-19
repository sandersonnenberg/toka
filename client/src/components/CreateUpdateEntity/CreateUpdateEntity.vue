<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name</label>
      <input v-model="form.name" required />
    </div>
    <div>
      <label>Description</label>
      <textarea v-model="form.description"></textarea>
    </div>
    <button type="submit">{{ submitLabel }}</button>
  </form>
</template>

<script>
import createUpdateEntity from './createUpdateEntity.js';
export default createUpdateEntity;
</script>
