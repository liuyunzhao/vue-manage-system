<template>
    <div class="order-list-container">
        <el-card class="box-card">
            <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <address-view @address-change="addressChange"
                              :span-size="12">
                    <el-form-item label="确认密码" prop="checkPass"
                                  style="width: 50%;margin-right: 10px;display: inline-block">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item
                            label="密码" prop="pass"
                            style="width: 40%;margin-right: 10px;display: inline-block">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                </address-view>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="ruleForm.age"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">提交</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>


        </el-card>
    </div>
</template>

<script>
  import AddressView from "../../components/ele-components/address-view";

  export default {
    name: "order-list",
    components: { AddressView },
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
      itemClick1() {
        this.$router.push({
          path: "/order/detail",
          query: {
            name: "liu",
            age: "man"
          }
        });
      },
      itemClick2() {
      },
      itemClick3() {
      },

      addressChange(data) {
        console.log(data);
      },

      provinceChange() {
      },

      cityChange() {
      },

      countyChange(e) {
      },

      itemClick4() {
      },
      itemClick5() {
      },
      itemClick6() {
      }
    }
  };
</script>

<style scoped lang="scss">
    .btn-container {
        display: flex;
    }
</style>