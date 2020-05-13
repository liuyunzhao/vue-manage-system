<template>
    <div>
        <el-table
                :data="tableData"
                v-loading="tableLoading"
                border
                stripe
                style="width: 100%;min-height: 200px">

            <template v-for="item in tableColumnData">
                <el-table-column
                        v-if="!item.isScope"
                        :header-align="item.headerAlign"
                        :fixed="item.fixed"
                        :prop="item.prop"
                        :label="item.label"
                        :align="item.align"
                        :width="item.width">
                </el-table-column>

                <el-table-column
                        v-else
                        :header-align="item.headerAlign"
                        :fixed="item.fixed"
                        :prop="item.prop"
                        :label="item.label"
                        :align="item.align"
                        :width="item.width">
                    <template slot-scope="scope">
                        <!-- 绑定在 <slot> 元素上的 attribute 被称为插槽 prop -->
                        <slot name="header" :scope="scope"></slot>
                    </template>
                </el-table-column>
            </template>
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
    name: "table-right-btn-view",
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

      tableColumnSlot: {
        type: Object,
        default: () => {
        }
      },

      paginationTotalNum: {
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
        this.$emit("current-page-change", val);
      },
      deleteRow1(a) {
        console.log("----delRow1");
        console.log(a);
      }
    }
  };
</script>

<style scoped lang="scss">

</style>