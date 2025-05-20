<template>
  <div class="card">
    <div>
      <h3 :title="item.name" class="card-title">{{ item.name }}</h3>
      <p class="card-date" v-if="item.createdAt">Created: {{ formatDate(item.createdAt) }}</p>
      <p class="card-date due-date" v-if="item.dueDate">Due Date: {{ formatDate(item.dueDate) }}</p>
      <div class="item-actions">
        <router-link :to="editLink">
          <img :src="editIcon" alt="Edit" />
        </router-link>
        <router-link :to="editLink">
          <img :src="deleteIcon" alt="Delete" @click.stop.prevent="handleDeleteClick" />
        </router-link>
      </div>
    </div>
  </div>
  <!-- <div v-else class="card">
    <div>
      <h3 :title="item.name" class="card-title">{{ item.name }}</h3>
      <p class="card-date" v-if="item.createdAt">Created: {{ formatDate(item.createdAt) }}</p>
      <p v-if="item.description">{{ item.description }}</p>
      <router-link class="edit-item" :to="editLink">
        <img :src="editIcon" alt="Edit" />
      </router-link>
    </div>
  </div> -->
</template>

<script>
import editIcon from '@/assets/edit.svg';
import deleteIcon from '@/assets/delete.svg';
import { deleteTaskById } from '@/services/api';

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
    formatDate(isoDate) {
      const date = new Date(isoDate);
      return date.toLocaleString();
    },
    async handleDeleteClick(event) {
      event.preventDefault();
      event.stopPropagation();
      if (confirm('Are you sure you want to delete this task?')) {
        try {
          // await this.$store.dispatch('deleteProject', this.item._id);

          await deleteTaskById(this.item._id);
          this.$emit('task-deleted', this.item._id);
        } catch (error) {
          console.error(error);
          alert('Failed to delete task.');
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
.due-date {
  color: red;
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
