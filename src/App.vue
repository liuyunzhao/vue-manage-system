<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
  export default {
    name: "App",
    created() {

    },
    mounted() {
      // this.replaceStoreData();
      //在用户离开网页时触发 离开网页有多种方式。如点击一个链接，刷新页面，提交表单，关闭浏览器等。移动端使用大部分支持
      // window.addEventListener('pagehide', this.saveStoreData);
      //当浏览器窗口关闭或者刷新时，会触发beforeunload事件，PC端浏览器都支持，大部分手机也支持
      // window.addEventListener('beforeunload', this.saveStoreData);
    },
    destroyed() {
      // window.removeEventListener('beforeunload', this.saveStoreData)
    },
    methods: {
      replaceStoreData() {
        if (localStorage.getItem("store")) {
          // alert('App.vue弹出1')
          this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem("store"))));
        }
      },
      saveStoreData() {
        // alert('App.vue弹出2')

        localStorage.setItem("store", JSON.stringify(this.$store.state));
      }
    }
  };
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 100%;
    }
</style>
