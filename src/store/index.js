import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)
//全局的
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

//各个模块的
import login from './login'
import home from './home'
import work from './work'
import mine from './mine'
import permission from './permission'
const state = {
  /* 面包屑导航列表 */
  // crumbList: []
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    login:login,
    home:home,
    work:work,
    mine,
    permission
  },
  plugins: [persistedState({
    storage: window.sessionStorage,
    reducer(val){
      return {
        login:val.login
      }
    }
  })],
  strict: true,
})
