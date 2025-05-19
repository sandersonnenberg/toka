<template>
  <div>
    <h1>Projects</h1>
    <ul>
      <li v-for="project in projects" :key="project._id">
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>


<script>
import home from './home.js';
export default home;
</script>