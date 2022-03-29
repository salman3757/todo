import { createRouter, createWebHistory } from "vue-router";
import ListView from "../views/ListView.vue";
import store from '@/store'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "list",
      component: ListView,
    },
    {
      path: "/create",
      name: "create",
      // route level code-splitting
      // this generates a separate chunk (create.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CreateView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/view/:id",
      name: "view",
      component: () => import("../views/ViewView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        blockedForAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        blockedForAuth: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } 
  else if (to.matched.some(record => record.meta.blockedForAuth)) {
    if (store.getters.isLoggedIn==false) {
      next()
      return
    }
    next('/')
  }
  else {
    next()
  }
})

export default router;
