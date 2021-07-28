import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../components/DashboadComponent.vue";
import RecoverPass from "../views/Forgotpass.vue";
import UserProfile from "../components/UserProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      reqiresAuth: true,
    },
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requireAuth: false,
    },
    props: true,
  },
  {
    path: "/userprofile",
    name: "UserProfile",
    component: UserProfile,
    meta: {
      reqiresAuth: true,
    },
    props: true,
  },
  {
    path: "/resetpassword",
    name: "RecoverPass",
    component: RecoverPass,
    meta: {
      requireAuth: false,
    },
    props: true,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requireAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});




router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.reqiresAuth)) {
    if (!localStorage.token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
