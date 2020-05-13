<template>
    <el-form :size="size" class="address-view-container clearfix" ref="addressForm" :model="addressForm" :label-width="labelWidth">
        <el-col :span="spanSize">
            <el-form-item label="活动名称">
                <el-select
                        style="width: 30%;margin-right: 10px"
                        v-model="addressForm.province"
                        placeholder="请选择"
                        @change='provinceChange'>
                    <el-option
                            v-for="item in provinceArr"
                            :key="item.value"
                            :label="item.label"
                            :value="{value:item.value, label:item.label}">
                    </el-option>
                </el-select>
                <el-select
                        style="width: 30%;margin-right: 10px"
                        v-model="addressForm.city"
                        placeholder="请选择"
                        @change="cityChange">
                    <el-option
                            v-for="item in cityArr"
                            :key="item.value"
                            :label="item.label"
                            :value="{value:item.value, label:item.label}">
                    </el-option>
                </el-select>
                <el-select
                        style="width: 30%;margin-right: 10px"
                        v-model="addressForm.county"
                        placeholder="请选择"
                        @change="countyChange">
                    <el-option
                            v-for="item in countyArr"
                            :key="item.value"
                            :label="item.label"
                            :value="{value:item.value, label:item.label}">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="24-spanSize">
            <slot></slot>
        </el-col>
    </el-form>
</template>
<!--
插槽中当一行需要多个el-form-item时，可以给el-form-item设置dispaly:inline-block
<el-form-item label="确认密码"
              prop="checkPass"
              style="width: 50%;margin-right: 10px;display: inline-block">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
</el-form-item>

-->
<script>
  import { mapState } from "vuex";
  import { MODULE_HOME, addressData } from "@/store/types";

  export default {
    name: "address-view",
    props: {
      labelWidth: {
        type: String,
        default: "80px"
      },
      spanSize: { //占比例
        type: Number,
        default: 12
      },
      size:{
        type: String,
        default: "small" //和main.js中对应
      }
    },
    data() {
      return {
        provinceArr: [],
        cityArr: [],
        countyArr: [],
        addressForm: {
          province: {},
          city: {},
          county: {}
        }
      };
    },
    created() {
      if (Object.keys(this.addressData).length > 0) {
        this.initProvince();
      }
    },
    watch: {
      addressData(newValue, oldValue) {
        console.log("---watcdh");
        this.initProvince();
      }
    },
    computed: {
      ...mapState(MODULE_HOME, [
        addressData
      ])
    },
    methods: {

      initProvince() {
        let provinceArr = Object.keys(this.addressData)
          .map(item => ({ value: item, label: this.addressData[item].p }));
        this.provinceArr = Object.freeze(provinceArr);
      },

      provinceChange() {
        let provinceObj = this.addressData[this.addressForm.province.value];
        let cityArr = Object.keys(provinceObj)
          .filter(item => item !== "p") //过滤掉省
          .map(item => ({ value: item, label: provinceObj[item].c }));
        this.cityArr = Object.freeze(cityArr);
        this.countyArr = [];
        this.addressForm.city = {};
        this.addressForm.county = {};
        this.addressChange();
      },

      cityChange() {
        let countyObj = this.addressData[this.addressForm.province.value][this.addressForm.city.value];
        let countyArr = Object.keys(countyObj)
          .filter(item => item !== "c") //过滤掉市
          .map(item => ({ value: item, label: countyObj[item] }));
        this.countyArr = Object.freeze(countyArr);
        this.addressForm.county = {};
        this.addressChange();
      },

      countyChange() {
        this.addressChange();
      },

      addressChange() {
        this.$emit("address-change", this.addressForm);
      }

    }
  };
</script>

<style scoped lang="scss">

</style>