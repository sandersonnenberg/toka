<template>
  <div class="grid">
    <div v-for="item in items" :key="item._id" class="card">
      <h3 :title="item.name" class="card-title">{{ item.name }}</h3>
      <p class="card-date" v-if="item.createdAt">Created: {{ formatDate(item.createdAt) }}</p>
      <p v-if="item.description">{{ item.description }}</p>

      <router-link class="edit-item" :to="generateLink(item)">
        <img :src="editIcon" alt="Edit" />
      </router-link>
    </div>
  </div>
</template>

<script>
import editIcon from '@/assets/edit.svg';

export default {
  props: {
    items: { type: Array, required: true },
    actionLabel: { type: String, default: 'View' },
    linkBuilder: { type: Function, required: true },
  },
  data() {
    return {
      editIcon,
    };
  },
  methods: {
    generateLink(item) {
      return this.linkBuilder(item);
    },
    formatDate(isoDate) {
      const date = new Date(isoDate);
      return date.toLocaleString();
    },
  },
};
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  padding: 16px;
}
.card {
  position: relative;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: box-shadow 0.2s ease;
}
.card-title {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-date {
  color: rgb(169, 181, 181);
  font-size: x-small;
  margin: 0;
}
.edit-item {
  position: absolute;
  top: 8px;
  right: 8px;
  text-decoration: none;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
  img {
    width: 20px;
    height: 20px;
  }
}
.card:hover {
  box-shadow: 0 2px 8px rgba(17, 7, 7, 0.1);
}
</style>
