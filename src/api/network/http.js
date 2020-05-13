/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import Vue from "vue";
import _axios from "axios";
let SHOW_LOADING = 1;  //展示loading框
let HIDE_LOADING = 2;  //隐藏loading框
let HIDE_TOAST = 3;  //隐藏toast
import store from "../../store/index";

/**
 * 创建axios实例
 */
let axiosInstance = _axios.create({
  baseURL: "http://47.105.71.81:3306",
  timeout: 1000 * 30
});

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, message) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      console.log("--=401---");
      // if (Vue.prototype.apiObj.isWeixin) {
      //     Vue.prototype.$toast(message);
      // } else {
      //     native.jsCallLogin()
      // }
      break;
    // 403 token过期 清除token并跳转登录页
    case 403:
      console.log("--=401---");
      // Vue.prototype.$toast(message);
      break;
    // 404请求不存在
    case 404:
      console.log("--=401---");
      // Vue.prototype.$toast("请求的资源不存在");
      break;
    case 444:
      console.log("--=401---");
      // Vue.prototype.$toast(message);
      break;
    default:
      console.log("--=401---");
      // Vue.prototype.$toast("网络错误，请稍后重试");
      break;
  }
};

let axios = {
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   *
   * @param {Object} params [请求时携带的参数]
   *   1：如果参数拼接到url后面，则params可不传
   *   2：如果不拼接到url后面，则把参数放到params对象中
   *   3：使用{}把params包起来目的是可在拦截请求中直接通过params拿到拼接的值（key只能是params）
   *
   * @param {Object} controlParams [用于控制loading显示、异常处理]
   *  默认：{
   *       isHideLoading:false,  //当传入true的时候  需要自己控制loading的隐藏
   *       isThrowException:false,  //当传人true时，需要自己捕获异常
   *       isHideToast:false  //当传入true时，需要自己toast
   *   }
   */
  get(url, params = {}, controlParams = {}) {
    showLoadingState(SHOW_LOADING, controlParams);
    return new Promise((resolve, reject) => {
      axiosInstance.get(url, { params })
        .then(res => {
          showLoadingState(HIDE_LOADING, controlParams);
          resolve(res);
        })
        .catch(err => {
          console.log("-err------");
          showLoadingState(HIDE_LOADING, controlParams);
          showToastState(HIDE_TOAST, controlParams, err);
          if (controlParams.isThrowException) {
            console.log("-err---isThrowException---");
            reject(err);
          }
        });
    });
  },

  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} data [请求时携带的参数]
   */
  post(url, data = {}, controlParams = {}) {
    return new Promise((resolve, reject) => {
      showLoadingState(SHOW_LOADING, controlParams);
      axiosInstance.post(url, data)
        .then(res => {
          showLoadingState(HIDE_LOADING, controlParams);
          resolve(res);
        })
        .catch(err => {
          showLoadingState(HIDE_LOADING, controlParams);
          showToastState(HIDE_TOAST, controlParams, err);
          if (controlParams.isThrowException) {
            reject(err);
          }
        });
    });
  }
};

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
axiosInstance.interceptors.request.use(
  config => {
    // 请求头添加token
    if (store.state.home.token) {
      config.headers.Authorization = `Bearer ${store.state.home.token}`;
    }
    return config;
  },
  error => {
    Promise.error(error);  //这里会走到响应拦截器的error的else里面,如果有return应该直接到
  });

/**
 * 响应拦截器
 */
axiosInstance.interceptors.response.use(
  res => {// 请求成功
    if (res.status !== 200) {  //应该不会进入
      return Promise.reject(res);
    }
    let data = res.data;
    console.log("----response===");
    console.log(data);
    console.log("----response===");
    if (data.code == 200 || data.success || data.code === 1) {
      return Promise.resolve(data.data);
    } else {
      return Promise.reject(res);
    }
  },
  // 请求失败
  error => {
    console.log("------erro========");
    const { response } = error;
    if (response) {// 请求已发出，但是不在2xx的范围
      console.log("----response-======");
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      console.log("-----=else=====");
      let response = {
        status: 444,
        data: {
          code: 444,
          message: "请求网络超时，请稍后重试"
        }
      };
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    }
  });

/**
 * 展示loading的状态
 */
function showLoadingState(state, params) {
  switch (state) {
    case SHOW_LOADING:
      if (!params.isHideLoading) {
        // Vue.prototype.$loading(true);
      }
      break;
    case HIDE_LOADING:
      console.log("--2-start--");
      if (!params.isHideLoading) {
        console.log("--2---");
        // Vue.prototype.$loading(false);
      }
      break;
    default:
      break;
  }
}

/**
 * 展示toast的状态
 */
function showToastState(state, params, error) {
  if (error.status !== 200) return;  //直接返回  因为在拦截器中已经toast了
  switch (state) {
    case HIDE_TOAST:
      if (!params.isHideToast) {
        // Vue.prototype.$toast(error.data.message?error.data.message:"网络错误，请稍后重试");
      }
      break;
  }
}

export default axios;
