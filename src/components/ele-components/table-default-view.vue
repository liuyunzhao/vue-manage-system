<template>
    <div>
        <el-table
                :data="tableData"
                v-loading="tableLoading"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    v-for="item in tableColumnData"
                    :header-align="item.headerAlign"
                    :fixed="item.fixed"
                    :prop="item.prop"
                    :label="item.label"
                    :align="item.align"
                    :width="item.width">
            </el-table-column>
        </el-table>
        <pagination-view
                :total-num="paginationTotalNum"
                @current-page-change="handleCurrentChange">
        </pagination-view>
    </div>

</template>
<!--
最多支持的属性
tableColumnData: [
 {
   prop: "date",
   label: "日期",
   width: 350,
   fixed:'left',
   headerAlign:'right',
   align:'center'
 }
]
-->
<script>
  import PaginationView from "./pagination-view";

  export default {
    name: "table-default-view",
    components: { PaginationView },
    props: {
      tableLoading: {
        type: Boolean,
        default: false
      },
      tableData: {
        type: Array,
        default: () => []
      },
      tableColumnData: {
        type: Array,
        default: () => []
      },

      paginationTotalNum:{
        type: Number,
        default: 0
      }
    },
    data() {
      return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {
      handleCurrentChange(val) {
        this.$emit('current-page-change', val)
      }
    }
  };
</script>

<style scoped lang="scss">

</style>