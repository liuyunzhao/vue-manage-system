<template>
    <div class="goods-list-container">
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-col :span="6">
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="ruleForm.age"></el-input>
                </el-form-item>
            </el-col>


            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-col>
            <el-button @click="exportExcelUserInfo">批量导出</el-button>
        </el-col>
    </div>
</template>

<script>
  // const { export_json_to_excel } = require("../../vendor/Export2Excel");
  import { export_json_to_excel } from "../../vendor/Export2Excel";
  import { exportExcel } from "../../utils/global-function";

  export default {
    name: "goods-list",
    data() {
      return {
        ruleForm: {
          pass: "",
          checkPass: "",
          age: ""
        },
        tableData: [
          { "name": "小明", "sex": "男", "age": "23" },
          { "name": "小红", "sex": "女", "age": "20" },
          { "name": "小丽", "sex": "女", "age": "22" }
        ]
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      exportExcelUserInfo() {
        exportExcel(['姓名','性别','年龄'],["name", "sex", "age"],this.tableData);
      },
    }
  };
</script>

<style scoped lang="scss">
    .test {

    }
</style>