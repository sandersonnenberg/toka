<template>
  <nav class="header-container">
    <router-link to="/" class="home-link">Home</router-link>
  </nav>
</template>
<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  // border-bottom: 1px solid #eee;

  .home-link {
    font-size: 1.2rem;
    font-weight: bold;
    color: #4a90e2;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: darken(#4a90e2, 10%);
    }
  }
}
</style>
