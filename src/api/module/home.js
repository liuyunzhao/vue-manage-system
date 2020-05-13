/**
 * 首页模块接口列表
 */

import axios from "../network/http"; // 导入http.js中创建的axios实例


const home = {
  /**
   * 获取登录信息
   */
  doLogin(data) {
    return axios.post(`/user/login`, data);
  },
  /**
   * 获取登录信息
   */
  doAllPermissiion() {
    return axios.get(`/permission/all`);
  },

  /**
   * 获取用户权限
   */
  fetchPermission() {
    return axios.get("/user/info");
  }
};

export default home;
