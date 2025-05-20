import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/home/Home.vue';
import CreateProjectView from './views/createProjectView/CreateProjectView.vue';
import EditProjectView from './views/editProjectView/EditProjectView.vue';
import ViewProjectTasks from './views/viewProjectTasks/ViewProjectTasks.vue';
import TaskForm from './views/taskForm/TaskForm.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/projects/new',
    name: 'createProject',
    component: CreateProjectView,
  },
  {
    path: '/projects/:id/edit',
    name: 'editProject',
    component: EditProjectView,
  },
  {
    path: '/projects/:id/tasks',
    name: 'ViewProjectTasks',
    component: ViewProjectTasks,
  },
  {
    path: '/projects/:id/tasks/new',
    name: 'TaskCreate',
    component: TaskForm,
    props: (route) => ({ projectId: route.params.id }),
  },
  {
    path: '/projects/:id/tasks/:taskId/edit',
    name: 'TaskEdit',
    component: TaskForm,
    props: (route) => ({ projectId: route.params.id, taskId: route.params.taskId }),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
