<template>
    <div :class="{dynamicMenuItemSpace:!isSidebarNavCollapse}">
        <template v-for='v in sidebarMenuList'>
            <el-submenu
                    v-if='v.children
                    && v.children.length>0
                    && !v.children[0].meta.isHideChildren'
                    :index='v.name'
                    :key='v.name'>
                <template slot='title'>
                    <font-icon
                            v-if="v.meta&&v.meta.icon"
                            :icon-name="v.meta.icon"
                            add-class="dynamic-icon-class"></font-icon>
                    <span slot="title">{{v.meta.name}}</span>
                </template>
                <el-menu-item-group>
                    <span slot="title" v-show="isSidebarNavCollapse">{{v.meta.name}}</span>
                    <dynamic-menu class="nest-menu" :sidebar-menu-list='v.children'></dynamic-menu>
                </el-menu-item-group>
            </el-submenu>

            <el-menu-item
                    v-else
                    :key='v.name'
                    :index='v.name'
                    @click='gotoRoute(v.name)'>
                <font-icon v-if="v.meta&&v.meta.icon"
                           :icon-name="v.meta.icon"
                           add-class="dynamic-icon-class"></font-icon>
                <span slot='title'>{{v.meta.name}}</span>
            </el-menu-item>

        </template>
    </div>
</template>

<script>

  import FontIcon from "@/components/fontIcon/index";
  import { mapGetters } from "vuex";
  import { MODULE_PERMISSION, isSidebarNavCollapse } from "@/store/types";

  export default {
    name: "DynamicMenu",
    components: { FontIcon },
    props: {
      sidebarMenuList: {
        type: Array
      }
    },
    computed: {
      ...mapGetters(MODULE_PERMISSION, [
        isSidebarNavCollapse
      ])
    },
    methods: {
      gotoRoute(name) {
        this.$router.push({ name });
      }
    }
  };
</script>
