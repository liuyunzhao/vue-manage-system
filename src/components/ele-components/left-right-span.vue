<template>
    <div :style="boxStyle">
        <el-row v-for="(outItem,outIndex) in dataArr"
                :key="outIndex"
                :style="rowStyle">
            <el-col :span="8"
                    :offset="innerIndex===0 ? 4 : 1"
                    v-for="(innerItem, innerIndex) in outItem"
                    :key="innerItem.key">
                <span :style="leftStyle">{{innerItem.key}}</span>
                <span :style="rightStyle">{{innerItem.value}}</span>
            </el-col>
        </el-row>
    </div>

</template>
<!--
dataArr数组格式为：
[
  [{
    key: "姓名：",
    value: "刘"
  }, {
    key: "年龄：",
    value: "20"
  }],[{
    key: "体重：",
    value: "100"
}]]

-->
<script>
  export default {
    name: "left-right-span",
    props: {
      dataArr: {
        type: Array,
        required: true,
        default: () => []
      },
      //boxStyle
      boxMarginTop: {
        type: String,
        default: "0"
      },
      boxMarginBottom: {
        type: String,
        default: "20"
      },

      //rowView
      rowMarginTop:{
        type: String,
        default: "20"
      },

      //leftView
      leftFontWeight: {
        type: String,
        default: "700"
      }
    },
    data() {
      return {

        boxStyle: {
          marginTop: `${this.boxMarginTop}px`,
          marginBottom:`${this.boxMarginBottom}px`
        },
        rowStyle:{
          marginTop: `${this.rowMarginTop}px`
        },
        leftStyle: {
          fontWeight: `${this.leftFontWeight}`
        },
        rightStyle: {}
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  };
</script>

<style scoped lang="scss">

</style>