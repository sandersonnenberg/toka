import CreateUpdateEntity from '@/components/CreateUpdateEntity/CreateUpdateEntity.vue';

export default {
  components: { CreateUpdateEntity },
  props: {
    title: String,
    submitLabel: String,
    fetchEntity: Function,
    saveEntity: Function,
    redirectPath: String,
  },
  data() {
    return {
      entityData: { name: '', description: '' },
      loaded: false,
    };
  },
  async created() {
    if (this.fetchEntity) {
      this.entityData = await this.fetchEntity();
    }
    this.loaded = true;
  },
  methods: {
    async handleSubmit(formData) {
      await this.saveEntity(formData);
      this.$router.push(this.redirectPath);
    },
  },
};
