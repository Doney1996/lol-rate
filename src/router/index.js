import Vue from 'vue'
import Router from 'vue-router'
import Man from "../components/Man";
import Admin from "../components/Admin";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Man',
      component: Man
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
