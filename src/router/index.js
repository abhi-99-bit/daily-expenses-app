import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
