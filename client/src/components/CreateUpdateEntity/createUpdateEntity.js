export default {
  props: {
    initialData: { type: Object, default: () => ({ name: '', description: '' }) },
    submitLabel: { type: String, default: 'Save' },
  },
  data() {
    return { form: { ...this.initialData } };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.form);
    },
  },
};
