/**
 * Created by liuyz on 2020/04/26 17:56
 */
const install = (v) =>{
  let Vue  = v;
  Vue.mixin({
    beforeCreate(){
      console.log("-----bef")
      console.log(this.$options.name);
    }
  })
};

export default (install);