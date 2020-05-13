<template>
    <section class="app-container" :class="classObj">
        <sidebar-nav class="sidebar-container"></sidebar-nav>
        <section class="main-container">
            <div class="fixed-header">
                <nav-bar></nav-bar>
                <tabs-view></tabs-view>
            </div>
            <div class="main-container-down">
                <transition name="fade-transform" mode="out-in">
                    <!--<keep-alive>-->
                    <router-view class="layout"/>
                    <!--<router-view class="layout" :key="key"/>-->
                    <!--</keep-alive>-->
                </transition>
            </div>
        </section>
    </section>
</template>

<script>
  import SidebarNav from "./component/sidebar-nav";
  import NavBar from "./component/nav-bar";
  import TabsView from "./component/tabs-view";

  import { mapGetters, mapMutations } from "vuex";
  import { MODULE_PERMISSION, MODULE_HOME, isSidebarNavCollapse, SET_ADDRESS } from "@/store/types";

  import address from "../../../mock/address.json";


  export default {
    name: "Layout",
    components: { SidebarNav, NavBar, TabsView },
    data() {
      return {
        aaa: false,
        key: ""
      };
    },
    computed: {
      ...mapGetters(MODULE_PERMISSION, [
        isSidebarNavCollapse
      ]),
      classObj() {
        return {
          hideSidebar: this.isSidebarNavCollapse,
          openSidebar: !this.isSidebarNavCollapse
        };
      }
    },
    created() {
      this.getAddress();
    },
    methods: {
      getAddress() { //请求获取地址
        this.SET_ADDRESS({
          address
        });
      },
      ...mapMutations(MODULE_HOME, [
        SET_ADDRESS
      ])
    }
  };
</script>

