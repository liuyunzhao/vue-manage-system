<template>
    <div class="index-container">
        <el-form
                class="login-form"
                ref="ruleForm"
                :rules="rules"
                :model="form"
                label-width="auto"
                status-icon>
            <h3 class="title">我的电脑桌面</h3>
            <el-form-item prop="name">
                <el-input placeholder="请输入用户名" v-model="form.name">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="form.password">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input placeholder="请再次输入密码" v-model="form.checkPass">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-form-item>
            <el-form-item>
                <!-- <el-button
                  type="primary"
                  style="width:100%"
                  @click="onSubmit('ruleForm')"
                  v-loading.fullscreen.lock="fullscreenLoading"
                >
                  立即登录-全屏加载框
                </el-button> -->

                <el-button
                        type="primary"
                        style="width:100%"
                        @click="onSubmit('ruleForm')"
                        :loading="btnLoading"
                >立即登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { mapMutations, mapActions } from "vuex";
  import { MODULE_LOGIN, LOGIN_IN, MODULE_PERMISSION } from "@/store/types";


  export default {
    name: "login",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      let againCheckPass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.form.password) {
          callback(new Error("两次输入不一致"));
        } else {
          callback();
        }
      };
      return {
        form: {
          name: "",
          password: "",
          checkPass: ""
        },
        rules: {
          name: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
            { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
          ],
          password: [
            { validator: validatePass, trigger: "blur" },
            { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
          ],
          checkPass: [
            // { validator: againCheckPass, trigger: 'blur' },
            // { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ]
        },
        btnLoading: false,
        fullscreenLoading: false
      };
    },
    created() {
      // this.getHomeData()
    },
    methods: {
      onSubmit(formName) {
        this.LOGIN_IN({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" });  // 将映射为 `this.$store.commit('LOGIN_IN', { token: "123" })`
        // this.$router.replace("/layout");
        // this.$router.push({path:'/'})
        this.$router.push({path:'/'})
      },
      ...mapMutations(MODULE_LOGIN, [
        LOGIN_IN
      ])
    }
  };
</script>
<style lang='scss' scoped>
    .index-container {
        width: 100%;
        height: 100%;
        position: relative;
        .login-form {
            width: 500px;
            height: 500px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -250px;
            margin-top: -250px;
            box-sizing: border-box;
            padding: 0 100px;
            .title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-weight: bold;
                font-size: 24px;
            }
        }
    }
</style>

