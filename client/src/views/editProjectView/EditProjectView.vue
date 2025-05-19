<template>
  <EntityFormView
    title="Edit Project"
    submitLabel="Update"
    :fetchEntity="loadProject"
    :saveEntity="updateProject"
    redirectPath="/projects"
  />
</template>

<script>
import editProjectView from './editProjectView.js';
export default editProjectView;
</script>
