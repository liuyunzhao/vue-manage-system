import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./styles/index.scss";
import ElementUI from "element-ui";
// 引入样式
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI, { size: "small", zIndex: 3000 });

import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration

import { setTitle } from "./utils/recursion-router";

// import "../public/static/cdn/element-ui/2.13.0/index.css"; //修改了input高度后会移动
// Vue.use(ElementUI);

import { loadStyle } from "@/utils/utils";

import {
  iconfontUrl,
  iconfontVersion
} from "@/icons";

iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace("$key", ele));
});

import api from "@/api"; // 将所有接口api挂载到原型上
Vue.prototype.$api = api;

Vue.config.productionTip = false;

import { PERMISSION_GET_USER_PERMISSION } from "@/store/types";

router.beforeEach((to, from, next) => {
  NProgress.start();
  setTitle(to.meta.name);
  console.log("---beforeEach");
  if (!store.state.login.token) {
    NProgress.done();

    /**
     * 如果没有登录而直接输入如 http://192.168.0.101:8081/goods/classify
     * 本应该匹配/goods和/goods/classify两个路由，但因没登录还没有动态添加这两个路由，所以匹配为[]空数组，即to.matched为[]
     *
     *  如果退出后把动态添加的路由也删除，则if永远不会进入，否则当退出到登录页再点击浏览器返回键就会回到之前页，而这明显是不正确的
     *
     *  如果/goods和/goods/classify两个路由默认就有，不用动态添加
     */
    if (to.matched.length > 0) {
      // if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
      console.log("---beforeEach--kong-token--if");
      next();
    } else {
      console.log("---beforeEach--kong-token--else");
      next({ path: "/login" });
    }
  } else {
    if (!(store.state.permission.sidebarMenuList.length !== 0)) {
      console.log("main---dispatch--if");
      store.dispatch(PERMISSION_GET_USER_PERMISSION).then(() => {
        NProgress.done();
        console.log("main---dispatch");
        console.log(to.path);
        next({ path: to.path, query: to.query });
      });
    } else {
      NProgress.done();
      if (to.path !== "/login") {
        console.log("main---else--if");
        next();
      } else {
        console.log("main---else--else");
        console.log(from.fullPath);
        next(from.fullPath);
      }
    }
  }
});


router.afterEach((to, from, next) => {
  NProgress.done();
});

Vue.config.errorHandler = function(err, vm, info, a) {
  Vue.nextTick(() => {
    console.log("----error---");
    console.error(err, info);
  });
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
