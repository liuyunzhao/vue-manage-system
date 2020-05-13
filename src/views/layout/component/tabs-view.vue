<template>
    <el-tabs :value="currentTabPath"
             type="card"
             class="tabs-container"
             @tab-click='addClick'
             @tab-remove=deleteTab>
        <el-tab-pane
                v-for="(item, index) in tabsList"
                :key="item.fullPath"
                :closable="index!==0"
                :label="item.metaName"
                :name="item.path">
            {{item.metaName}}
        </el-tab-pane>
    </el-tabs>
</template>

<!--
el-tabs介绍
v-model 绑定值，选中选项卡的 name
type	风格类型
closable	标签是否可关闭
tab-remove	点击 tab 移除按钮后触发

el-tab-pane介绍
label	选项卡标题
name	与选项卡绑定值 value/v-model 对应的标识符，表示选项卡别名
-->
<script>
  import { mapState, mapActions } from "vuex";
  import {
    MODULE_PERMISSION,
    addTab,
    removeTab,
    tabsList,
    currentTabPath,
    tabDeleteMonitor
  } from "@/store/types";

  export default {
    name: "tabs-view",
    data() {
      return {};
    },
    computed: {
      ...mapState(MODULE_PERMISSION, [
        tabsList,
        currentTabPath,
        tabDeleteMonitor
      ])
    },
    watch: {
      //同一个路由跳转，这里不会监听到，如/home 跳转到 /home 则不会监听，多用于页面刷新
      $route() {
        this.addCurrentTabs();
      },
      tabDeleteMonitor() {
        this.resetTabView();
      }
    },
    created() {
      console.log("---tabs--created");
      console.log(this.$route);
      this.addTab({
        name: "home",
        path: "/home/index",
        fullPath: "/home/index",
        meta: { name: "首页" },
        query: {}
      });
      this.addTab(this.$route);
    },
    methods: {
      resetTabView() {
        let { path, query } = this.tabsList[this.tabsList.length - 1];
        this.$router.push({
          path,
          query
        });
      },
      /**
       * 选中点击的tab
       * @param targetObj 被选中的标签 tab 实例
       */
      addClick(targetName) {
        console.log("----addClick");
        console.log(this.currentTabPath);
        let { index, name } = targetName;
        if (this.currentTabPath === name) return;
        this.$router.push({
          path: this.tabsList[index].path,
          query: this.tabsList[index].query
        });
      },
      addCurrentTabs() {
        console.log("----addCurrentTabs");
        console.log(this.$route);
        this.addTab(this.$route);
      },
      /**
       * 被删除的标签的 name
       */
      deleteTab(targetName) {
        console.log("----deleteTab");
        this.removeTab({ path: targetName });
      },

      ...mapActions(MODULE_PERMISSION, {
        addTab,
        removeTab
      })
    }
  };
</script>

