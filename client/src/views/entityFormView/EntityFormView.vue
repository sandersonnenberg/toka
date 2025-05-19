<template>
  <div v-if="loaded">
    <h1>{{ title }}</h1>
    <CreateUpdateEntity 
      :initialData="entityData" 
      :submitLabel="submitLabel" 
      @submit="handleSubmit" 
    />
  </div>
</template>

<script>
import entityFormView from './entityFormView.js';
export default entityFormView;
</script>
