<template>
    <el-card class="order-detail-container">
        <el-page-header @back="goBack" content="订单详情">
        </el-page-header>
        <left-right-span :data-arr="userInfoArr" box-margin-bottom="50"></left-right-span>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="用户管理" name="first" class="clearfix">
                <table-right-btn-view
                        :table-data="tableData"
                        :table-column-data="tableColumnArr"
                        :table-loading="tableLoading"
                        :pagination-total-num="paginationTotalNum"
                        @current-page-change="handleCurrentChange">
                    <template #header="{ scope }">
                        <el-button
                                v-if="scope.row.isDetailPermission"
                                @click.native.prevent="deleteRow(scope.$index, scope.row)"
                                type="text"
                                size="small">
                            详情
                        </el-button>
                        <el-button
                                v-if="scope.row.isEditPermission"
                                @click.native.prevent="deleteRow(scope.$index, scope.row)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                v-if="scope.row.isAddPermission"
                                @click.native.prevent="deleteRow(scope.$index, scope.row)"
                                type="text"
                                size="small">
                            添加
                        </el-button>
                        <el-button
                                v-if="scope.row.isDeletePermission"
                                @click.native.prevent="deleteRow(scope.$index, scope.row)"
                                type="text"
                                size="small">
                            删除
                        </el-button>
                    </template>
                </table-right-btn-view>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">
                <table-default-view
                        :table-data="tableData2"
                        :table-column-data="tableColumnArr2"
                        :table-loading="tableLoading"
                        :pagination-total-num="paginationTotalNum"
                        @current-page-change="handleCurrentChange"></table-default-view>
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>

    </el-card>

</template>

<script>
  import LeftRightSpan from "../../components/ele-components/left-right-span";
  import PaginationView from "../../components/ele-components/pagination-view";
  import TableDefaultView from "../../components/ele-components/table-default-view";
  import TableRightBtnView from "../../components/ele-components/table-right-btn-view";

  export default {
    name: "order-detail",
    components: { TableRightBtnView, TableDefaultView, PaginationView, LeftRightSpan },
    data() {
      return {
        activeName: "first",
        paginationTotalNum: 17,
        tableLoading: true,
        obj: {
          city: "Beijing"
        },
        tableColumnArr: [
          {
            prop: "date",
            label: "日期",
            width: 350,
            fixed: "left",
            align: "center"
          }, {
            prop: "name",
            label: "姓名",
            align: "center"
          }, {
            prop: "province",
            label: "省份"
          }, {
            prop: "city",
            label: "市区"
          }, {
            prop: "addres",
            label: "操作",
            isScope: true
          }
        ],
        tableColumnArr2: [
          {
            prop: "date",
            label: "日期"
          }, {
            prop: "name",
            label: "姓名"
          }, {
            prop: "province",
            label: "省份"
          }, {
            prop: "city",
            label: "市区"
          }
        ],
        userInfoArr: [
          [{
            key: "姓名：",
            value: "刘"
          }, {
            key: "年龄：",
            value: "20"
          }], [{
            key: "身高：",
            value: "180"
          }, {
            key: "性别：",
            value: "男"
          }], [{
            key: "体重：",
            value: "100"
          }]],
        userInfo: {
          name: "刘",
          age: "20",
          height: "180",
          sex: "男"
        },
        tableData: [],
        tableData2: [{
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }, {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        }, {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }, {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        }, {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }, {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        }],
        workInfo: {
          time: "2010-09-09",
          type: "技术"
        }
      };
    },
    created() {
      // this.initUserInfo();
      this.initData();
    },
    mounted() {
    },
    methods: {
      deleteRow(index, data) {
        console.log("----deleteRow");
        console.log(index);
        console.log(data);
      },
      initData() {
        let arr = [{
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          isDetailPermission: true,
          isDeletePermission: true,
          isAddPermission: true,
          isEditPermission: true
        }, {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
          isDetailPermission: false,
          isDeletePermission: false,
          isAddPermission: false,
          isEditPermission: false
        }, {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
          isDetailPermission: true,
          isDeletePermission: false,
          isAddPermission: false,
          isEditPermission: false
        }, {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
          isDetailPermission: false,
          isDeletePermission: true,
          isAddPermission: false,
          isEditPermission: false
        }, {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          isDetailPermission: false,
          isDeletePermission: false,
          isAddPermission: true,
          isEditPermission: false
        }, {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
          isDetailPermission: false,
          isDeletePermission: false,
          isAddPermission: false,
          isEditPermission: true
        }, {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
          isDetailPermission: true,
          isDeletePermission: false,
          isAddPermission: false,
          isEditPermission: true
        }, {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
          isDetailPermission: false,
          isDeletePermission: true,
          isAddPermission: true,
          isEditPermission: false
        }, {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
          isDetailPermission: true,
          isDeletePermission: false,
          isAddPermission: false,
          isEditPermission: true
        }, {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
          isDetailPermission: true,
          isDeletePermission: false,
          isAddPermission: false,
          isEditPermission: true
        }, {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
          isDetailPermission: true,
          isDeletePermission: false,
          isAddPermission: false,
          isEditPermission: true
        }];
        setTimeout(() => {
          this.tableLoading = false;
          this.tableData = arr;
        }, 0);
      },
      handleTabClick(tab, event) {
        console.log(tab, event);
      },
      handleTableClick(row) {
        console.log(row);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.tableLoading = true;
        setTimeout(() => {
          this.tableLoading = false;
        }, 1000);
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style scoped lang="scss">
    .margin-top {
        margin-top: 20px;
    }
</style>