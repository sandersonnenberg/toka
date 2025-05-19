import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/home/Home.vue";
import Projects from "./views/projects/Projects.vue";
import CreateProjectView from './views/createProjectView/CreateProjectView.vue';
import EditProjectView from './views/editProjectView/EditProjectView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
  },
  { 
    path: '/projects/new',
    name: "createProject",
    component: CreateProjectView
  },
  { 
    path: '/projects/:id/edit',
    name: "editProject",
    component: EditProjectView
  
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
