<template>
    <div>
        <el-card class="box-card">
            <el-form class="el-from-container" :inline="true" ref="form" :model="form" label-width="80px">
                <el-col :span="6">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name" style="width: 100%;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name" style="width: 100%;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name" style="width: 100%;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.name" style="width: 100%;"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-form ref="form" :model="form" label-width="80px" class="clearfix">
                <el-col :span="12">
                    <el-form-item label="活动名称">
                        <el-select style="width: 30%;margin-right: 10px" v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select style="width: 30%;margin-right: 10px" v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select style="width: 30%;margin-right: 10px" v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="活动名称">
                        <el-date-picker
                                v-model="value1"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form>
            <el-row style="margin-top: 20px">
                <el-col :span="6" :offset="18">
                    <el-button type="primary" @click="exportExcelTableInfo">导出</el-button>
                    <el-button type="primary">重置</el-button>
                    <el-button type="primary">查询</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card style="margin-top: 40px">
            <el-table :data="tableData"
                      border
                      stripe
                      :row-class-name="tableRowClassName"
                      style="width: 100%">
                <el-table-column
                        prop="time"
                        width="200"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="name"
                        width="200"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
                <el-table-column
                        width="200"
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="handleClick(scope.row,scope.$index, scope)"
                                type="text"
                                size="small">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog
                title="个人信息"
                :visible.sync="dialogVisible"
                width="30%"
                class="dialog-container"
                :before-close="handleClose">
            <el-row type="flex">
                <el-col :span="10" :offset="2">
                    <span class="title">姓名：</span>
                    <span>阿斯顿发生的</span>
                </el-col>
                <el-col :span="10" :offset="2">
                    <span class="title">性别：</span>
                    <span>男</span>
                </el-col>
            </el-row>
            <el-row type="flex" style="margin-top: 20px">
                <el-col :span="10" :offset="2">
                    <span class="title">姓名：</span>
                    <span>阿斯顿发生的</span>
                </el-col>
                <el-col :span="10" :offset="2">
                    <span class="title">性别：</span>
                    <span>男</span>
                </el-col>
            </el-row>
            <el-row type="flex" style="margin-top: 20px">
                <el-col :span="22" :offset="2">
                    <span class="title">图片：</span>
                    <el-image
                            style="width: 100px; height: 100px;background-color: #eee"
                            :src="url"
                            fit="fill"
                            @click="imgClick"
                    >
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </el-col>
            </el-row>

        </el-dialog>
        <el-dialog
                :visible.sync="carouselVisible"
                width="30%"
                class="dialog-container"
                :before-close="carouselClose">
            <el-carousel height="550px">
                <el-carousel-item v-for="(item,index) in srcList" :key="item">
                    <el-image
                            style="width: 100%; height: 100%;background-color: #d3dce6"
                            :src="item"
                            fit="fill"
                            @click="carouselItemClick(index)"></el-image>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>

</template>
<script>
  import { exportExcel } from "@/utils/global-function";

  export default {
    name: "home",
    data() {
      return {
        dialogVisible: false,
        carouselVisible: false,
        input4: "",
        value1: "",
        value2: "",
        form: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
        options: [{
          value: "选项1",
          label: "黄金糕"
        }, {
          value: "选项2",
          label: "双皮奶"
        }, {
          value: "选项3",
          label: "蚵仔煎"
        }, {
          value: "选项4",
          label: "龙须面"
        }, {
          value: "选项5",
          label: "北京烤鸭"
        }],
        value: "",
        tableData: [{
          time: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          time: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄"
        }, {
          time: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄上海市普陀区金沙江路 1517 弄"
        }, {
          time: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }],

        url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        srcList: [
          "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
          "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
        ]
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      exportExcelTableInfo() {
        exportExcel(["姓名", "时间", "地址"], ["name", "time", "address"], this.tableData, "用户信息表");
      },
      carouselItemClick(index) {
        this.$message(`点击了${index}`);
      },
      imgClick() {
        this.carouselVisible = true;
      },
      carouselClose() {
        this.carouselVisible = false;
      },
      handleClose() {
        this.dialogVisible = !this.dialogVisible;
      },
      onSubmit() {
        console.log("submit!");
      },
      handleClick(row, index, data) {
        this.dialogVisible = !this.dialogVisible;
        console.log(row);
        console.log(index);
        console.log(data);
      },
      handleClick1(row) {
        console.log(row);
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex % 4 == 0) {
          return "success-row";
        }
        return "";
      }

    }
  };
</script>

<style lang="scss">


    .el-table .success-row {
        background: #eee;
    }

    .dialog-container {
        .title {
            font-size: 16px;
            font-weight: 600;
        }
        .image-slot {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .carousel-container {
        position: fixed;
        top: 15vh;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 30%;
        background-color: white;
        z-index: 3002;
    }

</style>