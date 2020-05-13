<template>
    <div class="nav-bar-container clearfix">
        <i class="toggle-nav-collapse"
           :class="[isSidebarNavCollapse ? 'el-icon-s-unfold':'el-icon-s-fold']"
           @click="toggleNavCollapse"
        ></i>
        <el-breadcrumb class="breadcrumb-container" separator="/">
            <transition-group name="breadcrumb">
                <template v-for="(route,index) in breadcrumbList">
                    <el-breadcrumb-item
                            :key="route.name"
                            :to="{name:route.name}"
                            v-if="route.name!='home-manage'"
                            :class="{'is-last-link':index==breadcrumbList.length-1}">
                        {{route.meta.name}}
                    </el-breadcrumb-item>
                </template>
            </transition-group>
        </el-breadcrumb>

        <div class="right-container">
            <font-icon add-class="screenfull-icon"
                       :icon-name="isFullscreen ? 'icon-icon-sx':'icon-webicon311'"
                       @click.native="screenfullClick">
            </font-icon>

            <div class="right-menu">
                <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">退出登录</el-dropdown-item>
                        <el-dropdown-item command="b">狮子头</el-dropdown-item>
                        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                        <el-dropdown-item command="d">双皮奶</el-dropdown-item>
                        <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

    </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from "vuex";
  import screenfull from "screenfull";
  import {
    MODULE_PERMISSION,
    MODULE_LOGIN,
    SET_SIDEBAR_NAV_STATE,
    loginOut,
    isSidebarNavCollapse
  } from "@/store/types";
  import FontIcon from "../../../components/fontIcon/index";

  export default {
    name: "NavBar",
    components: { FontIcon },
    data() {
      return {
        isFullscreen: false,
        breadcrumbList: []
      };
    },
    computed: {
      ...mapGetters(MODULE_PERMISSION, [
        isSidebarNavCollapse
      ])
    },
    watch: {
      $route(route) {
        this.getBreadcrumb();
      }
    },
    created() {
      this.getBreadcrumb();
      this.initScreenfull();
    },

    methods: {
      /**
       * 初始化全屏
       */
      initScreenfull() {
        if (screenfull.isEnabled) {
          screenfull.on("change", this.fullscreenChange);
        }
        // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
        this.$once("hook:beforeDestroy", () => {
          if (screenfull.isEnabled) {
            screenfull.off("change", this.fullscreenChange);
          }
        });
      },

      toggleNavCollapse() {
        this.SET_SIDEBAR_NAV_STATE({ isSidebarNavCollapse: !this.isSidebarNavCollapse });
      },
      screenfullClick() {
        if (!screenfull.isEnabled) { //浏览器是否支持全屏
          this.$message({
            message: "浏览器不能全屏",
            type: "warning"
          });
          return false;
        }
        screenfull.toggle();
      },

      /**
       * 屏幕改变监听
       */
      fullscreenChange() {
        this.isFullscreen = screenfull.isFullscreen;
      },
      getBreadcrumb() {
        let arrMatched = this.$route.matched.filter(item => item.meta && item.meta.name);
        this.breadcrumbList = arrMatched;
      },
      handleCommand(command) {
        switch (command) {
          case "a":
            this.loginOut({});
            this.$router.push({ path: "/login" });
            break;
          case "b":
            this.$message.success("click on item " + command);
            break;
          case "c":
            this.$message.error("click on item " + command);
            break;
          case "d":
            this.$message.warning("click on item " + command);
            break;
          case "e":
            this.$message.info("click on item " + command);
            break;
        }
      },
      loginOutDialog() {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success"
        }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      },

      ...mapMutations(MODULE_PERMISSION, [
        SET_SIDEBAR_NAV_STATE
      ]),
      ...mapActions(MODULE_LOGIN, [
        loginOut
      ])
    }
  };
</script>
