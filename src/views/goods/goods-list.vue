<template>
    <div class="goods-list-container">
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <!--<el-row type="flex" class="row-bg" justify="space-around">-->
                <!--<el-col :span="6">-->
                    <!--<el-form-item label="密码" prop="pass">-->
                        <!--<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                    <!--<el-form-item label="确认密码" prop="checkPass">-->
                        <!--<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                    <!--<el-form-item label="年龄" prop="age">-->
                        <!--<el-input v-model.number="ruleForm.age"></el-input>-->
                    <!--</el-form-item>-->
                <!--</el-col>-->
            <!--</el-row>-->

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
            <el-col :span="6" >
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="ruleForm.age"></el-input>
                </el-form-item>
            </el-col>



            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
  export default {
    name: "goods-list",
    data() {
      return {
        ruleForm: {
          pass: "",
          checkPass: "",
          age: ""
        }
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
      }
    }
  };
</script>

<style scoped lang="scss">
    .test{

    }
</style>