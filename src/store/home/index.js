/**
 * Created by liuyz on 2019/09/23 14:48
 */
import * as types from "../types";
import { resetRouter } from "../../router";

const home = {
  namespaced: true,
  state: {
    addressData:{}
  },
  mutations: {
    [types.SET_ADDRESS](state, payload) {
      console.log(payload);
      state.addressData = Object.freeze(payload.address);
    },
  },
  actions: {},
  getters: {}
};
export default home;