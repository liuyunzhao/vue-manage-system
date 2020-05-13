/**
 * Created by liuyz on 2019/09/23 14:48
 */
import * as types from "../types";
import { resetRouter } from "../../router/index";

const login = {
  namespaced: true,
  state: {
    token: ""
  },
  actions: {
    [types.loginIn]({ commit, state }, payload) {
      commit(types.LOGIN_IN, payload);
    },
    [types.loginOut]({ commit, state }, payload) {
      commit(types.LOGIN_OUT, payload);
      commit(types.PERMISSION_SET_SIDEBAR_MENU_LIST, [], { root: true });
    }
  },
  mutations: {
    [types.LOGIN_IN](state, payload) {
      console.log("---login-in");
      state.token = payload.token;
    },
    [types.LOGIN_OUT](state, payload) {
      console.log("---login-LOGIN_OUT");
      state.token = "";
      resetRouter();

    }
  },
  getters: {}
};
export default login;