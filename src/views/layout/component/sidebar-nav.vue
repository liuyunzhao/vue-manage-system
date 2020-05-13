<template>
    <el-scrollbar>
            <h5 class="crm">CRM</h5>
        <el-menu
                :collapse="isSidebarNavCollapse"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :default-active="currentMenu">
            <dynamic-menu :sidebar-menu-list="sidebarMenuList"></dynamic-menu>
        </el-menu>
    </el-scrollbar>

</template>
<script>
  import DynamicMenu from "./dynamic-menu";
  import { mapState, mapGetters } from "vuex";
  import { hideRouteObj } from "@/router/hide-route-obj";
  import {
    MODULE_PERMISSION,
    sidebarMenuList,
    permissionList,
    isSidebarNavCollapse
  } from "@/store/types";

  export default {
    name: "sidebar-nav",
    components: { DynamicMenu },
    data() {
      return {
      };
    },
    computed: {
      currentMenu() {
        const { name, meta, matched } = this.$route;
        console.log("----currentMenu");
        console.log(matched);
        console.log(this.$route);
        console.log(hideRouteObj);
        //如果路由是动态添加的但不包括在左侧菜单内，则判断该菜单输入那个左侧菜单里面的
        if (this.permissionList.indexOf(name) === -1) {
          if (hideRouteObj[name]) {
            return hideRouteObj[name];
          }
        }
        if (meta.isHideChildren) {  //当只有一个孩子时才可使用，多个孩子不能设置此属性
          for (let i = 0; i < matched.length; i++) {
            if (matched[i].name !== name) {
              return matched[i].name;
            }
          }
        }

        return name;
      },

      ...mapState(MODULE_PERMISSION, [
        sidebarMenuList,
        permissionList
      ]),
      ...mapGetters(MODULE_PERMISSION, [
        isSidebarNavCollapse
      ])
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>