<template>
  <div class="card" @click="goToProject">
    <div>
      <h3 :title="item.name" class="card-title">{{ item.name }}</h3>
      <p class="card-date" v-if="item.createdAt">Created: {{ formatDate(item.createdAt) }}</p>
      <p v-if="item.description">{{ item.description }}</p>
    </div>
    <div class="item-actions">
      <router-link :to="editLink">
        <img title="Edit" :src="editIcon" alt="Edit" />
      </router-link>
      <img title="Delete" :src="deleteIcon" alt="Delete" @click.stop.prevent="handleDeleteClick" />
    </div>
  </div>
</template>

<script>
import editIcon from '@/assets/edit.svg';
import deleteIcon from '@/assets/delete.svg';

export default {
  props: {
    item: { type: Object, required: true },
    editLink: { type: [String, Object], required: true },
    type: { type: String, default: 'task' },
  },
  data() {
    return {
      editIcon,
      deleteIcon,
    };
  },
  computed: {
    projectViewLink() {
      return { name: 'ViewProjectTasks', params: { id: this.item._id } };
    },
  },
  methods: {
    goToProject() {
      this.$router.push(this.projectViewLink);
    },
    formatDate(isoDate) {
      const date = new Date(isoDate);
      return date.toLocaleString();
    },
    async handleDeleteClick(event) {
      event.preventDefault();
      event.stopPropagation();
      if (confirm('Are you sure you want to delete this project?')) {
        try {
          this.$emit('project-deleted', this.item._id);
        } catch (error) {
          console.error(error);
          alert('Failed to delete project.');
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card-link-wrapper {
  text-decoration: none;
  color: inherit;
}
.card {
  position: relative;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: box-shadow 0.2s ease;
  cursor: pointer;
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
.item-actions {
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
