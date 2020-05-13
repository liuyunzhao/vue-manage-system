<template>
    <el-pagination
            :style="boxStyle"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            background
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="totalNum">
    </el-pagination>
</template>

<script>
  export default {
    name: "pagination-view",
    props: {
      totalNum: {
        type: Number,
        default: 0
      },
      //boxStyle
      boxMarginTop: {
        type: String,
        default: "13"
      },
      boxMarginBottom: {
        type: String,
        default: "0"
      },
    },
    data() {
      return {
        currentPage: 1,
        boxStyle: {
          marginTop: `${this.boxMarginTop}px`,
          marginBottom:`${this.boxMarginBottom}px`
        },
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(typeof val);
        this.$emit('current-page-change', val)
      }
    }
  };
</script>

<style scoped lang="scss">

</style>