/**
 * Created by liuyz on 2020/04/10 10:37
 */
import * as types from "../types";
import home from "../../api/module/home";
import { hideRouteObj } from "../../router/hide-route-obj";
import router from "../../router/index";
import dynamicRouter from "../../router/dynamic-router"; //全部动态路由
import { recursionRouter } from "../../utils/recursion-router";


const SET_ACCOUNT = "SET_ACCOUNT";

/**
 *tabsViewList: [{ routeName: name, tabName: meta.name }]
 */
const permission = {
  namespaced: true,
  state: {
    isSidebarNavCollapse: false,  //菜单是否折叠  true:折叠 false：不折叠
    sidebarMenuList: [],//菜单列表
    tabsList: [], //tabs列表
    currentTabPath: "", //当前tab  就是当前路径（不包括query）
    tabDeleteMonitor: false,  //通过切换true、false来实现tab删除监听
    permissionList: []
  },
  actions: {
    [types.getUserPermission]({ commit, dispatch, state }, payload) {
      console.log("-----actions----");
      // home.fetchPermission()
      //   .then(json => {
      //     console.log(json)
      //   });
      let requestData = [
        "home-manage",
        "home",
        "order",
        "order-list",
        "product-manage",
        "product-list",
        "review-manage",
        "return-goods",
        "goods",
        "goods-list",
        "goods-classify",
        "goods-classify-detail",
        "permission",
        "user-manage",
        "role-manage",
        "menu-manage"];

      let routes = recursionRouter(requestData, dynamicRouter);
      console.log(routes);
      commit(types.SET_SIDEBAR_MENU_LIST, JSON.parse(JSON.stringify(routes))); //左侧菜单显示的权限
      commit(types.SET_PERMISSION_LIST, [...requestData]);
      let newRequestData = [...requestData];

      Object.keys(hideRouteObj).filter(item => { //添加隐藏路由
        return requestData.includes(hideRouteObj[item]);
      }).filter(item => {
        newRequestData.push(item);
      });
      newRequestData.push("error"); //添加错误页

      let allRoutes = recursionRouter(newRequestData, dynamicRouter);
      console.log("--最终路由");
      console.log(allRoutes);
      router.addRoutes(allRoutes);
    },
    [types.addTab]({ commit, state }, payload) {
      console.log("---actions-add-views");

      let findIndex = state.tabsList.findIndex(item => item.path === payload.path);
      if (findIndex === -1) {//进入说明不包含去添加
        console.log("---1---" + payload.path);

        commit(types.ADD_TAB, payload);
      } else { //代表有，当有query时则需要更新
        if (Object.keys(payload.query).length !== 0) { //当query不为空时更新当前item
          console.log("---2---" + payload.path);
          commit(types.UPDATE_CURRENT_TAB, {
            index: findIndex,
            query: { ...payload.query }
          });
        }
      }
      console.log("---5---" + payload.path);
      commit(types.SET_CURRENT_TAB, payload.path);
    },
    [types.removeTab]({ commit, state }, payload) {
      console.log("---1");
      console.log(payload);
      let findIndex = state.tabsList.findIndex(item => item.path === payload.path);
      if (findIndex !== -1) {
        commit(types.REMOVE_TAB, { index: findIndex });
        if (state.currentTabPath === payload.path) { //当删除当前激活的tab条目时
          commit(types.TAB_DELETE_MONITOR);
        }
      }
    }
  },
  mutations: {
    [types.SET_CURRENT_TAB](state, path) {
      state.currentTabPath = path;
    },
    [types.ADD_TAB](state, payload) {
      let { name, path, fullPath, meta, query } = payload;
      state.tabsList.push({
        name,
        path,
        fullPath,
        metaName: meta.name,
        query: { ...query }
      });
    },
    [types.REMOVE_TAB](state, { index }) {
      state.tabsList.splice(index, 1);
    },
    [types.UPDATE_CURRENT_TAB](state, payload) {
      state.tabsList[payload.index].query = payload.query;
    },
    [types.TAB_DELETE_MONITOR](state) {
      console.log("----mutail=======monitore");
      state.tabDeleteMonitor = !state.tabDeleteMonitor;
    },
    [SET_ACCOUNT](state, payload) {
      console.log(payload);
    },
    [types.SET_SIDEBAR_MENU_LIST](state, payload) {
      console.log("----hengaoxing");
      state.sidebarMenuList = payload;
    },
    [types.SET_PERMISSION_LIST](state, payload) {
      state.permissionList = payload;
    },
    [types.SET_SIDEBAR_NAV_STATE](state, payload) {
      console.log(payload.isSidebarNavCollapse);
      state.isSidebarNavCollapse = payload.isSidebarNavCollapse;
    }
  },
  getters: {  //getters中的名字可以和state中的不一样
    isSidebarNavCollapse: state => state.isSidebarNavCollapse
  }
};
export default permission;