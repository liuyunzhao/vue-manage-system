import Vue from "vue";
import Router from "vue-router";
// import Layout from "../views/layout/index";
const Layout = () => import(/* webpackChunkName: "home" */ "../views/layout/index");
Vue.use(Router);

/**
 * 重写路由的push方法
 * 捕捉路由报错，当在一个路由上点击两次时捕捉异常
 */
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

export const defaultRoutes = [
  {
    path: "/",
    component: Layout,
    name: "a",
    redirect: "/home/index"
  }, {
    path: "/login",
    component: () => import("../views/login/login.vue"),
    meta: {
      name: "登录"
    }
  }, {
    path: "/404",
    component: () => import("../views/error/404.vue"),
    name: "errorPage",
    meta: {
      name: "404"
    }
  }
];

/* 初始路由 */
/*
export default new Router({
  mode: "history",
  routes: [

    {
      path: "/",
      component: Layout,
      name: "ro",
      redirect: "/home/index"
    },

    {
      path: "/login",
      component: () =>
        import("../views/login/login.vue")
    }
  ]
});

*/
const createRouter = () => new Router({
  mode: "history",
  routes: defaultRoutes,
  scrollBehavior: () => ({ y: 0 })
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export const resetRouter = () => {
  const newRouter = createRouter();
  console.log("--restRoute");
  console.log(newRouter.matcher);
  router.matcher = newRouter.matcher; // reset router
};

export default router;
