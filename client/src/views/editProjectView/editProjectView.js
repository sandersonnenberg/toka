import EntityFormView from '@/views/entityFormView/EntityFormView.vue';
import api from '@/services/api';

export default {
  components: { EntityFormView },
  methods: {
    loadProject() {
      const id = this.$route.params.id;
      return api.getProjectById(id);
    },
    updateProject(data) {
      const id = this.$route.params.id;
      return api.updateProject(id, data);
    },
  },
};
