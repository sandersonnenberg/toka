<template>
  <div>
    <h1>Projects</h1>
    <GenericGrid :items="projects" actionLabel="Edit" :linkBuilder="projectLink" />
  </div>
</template>

<script>
import home from './home.js';
export default home;
</script>
