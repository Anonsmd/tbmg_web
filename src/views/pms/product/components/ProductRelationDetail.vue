<template>
  <div style="margin-top: 50px">
    <el-form
      :model="value"
      :rules="rules"
      ref="productRelationForm"
      label-width="120px"
      style="width: 680px"
      size="small"
    >
      <el-form-item label="仓库" prop="warehouseId">
        <el-select
          v-model="value.stock.warehouseId"
          @change="handlewareHouseChange"
          placeholder="请选择仓库"
        >
          <el-option
            v-for="item in productwareHouseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品库存：" prop="currentCnt">
        <el-input v-model="value.stock.currentCnt"></el-input>
      </el-form-item>
      <el-form-item label="商品销量：" prop="sellCnt">
        <el-input v-model="value.stock.sellCnt"></el-input>
      </el-form-item>
      <el-form-item label="商品运送成本：" prop="averageCost">
        <el-input
          v-model="value.stock.averageCost"
          style="width: 300px"
        ></el-input>
        <span style="margin-left: 20px">元</span>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev"
          >上一步，填写商品属性</el-button
        >
        <el-button type="primary" size="medium" @click="handleFinishCommit"
          >完成，提交商品</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchWareHouseList } from "@/api/product";

export default {
  name: "ProductRelationDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      productwareHouseOptions: [],
      rules: {
        warehouseId: [
          { required: false, message: "该项为必填项", trigger: "blur" },
        ],
        currentCnt: [
          { required: false, message: "该项为必填项", trigger: "blur" },
        ],
        averageCost: [
          { required: false, message: "该项为必填项", trigger: "blur" },
        ],
        sellCnt: [
          { required: false, message: "该项为必填项", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getWareHouseList();
  },
  computed: {},
  methods: {
    handlewareHouseChange(val) {
      let warehouseName = "";
      for (let i = 0; i < this.productwareHouseOptions.length; i++) {
        if (this.productwareHouseOptions[i].value === val) {
          warehouseName = this.productwareHouseOptions[i].label;
          break;
        }
      }
      this.value.stock.warehouseName = warehouseName;
      this.value.stock.warehouseId = val;
    },
    getWareHouseList() {
      fetchWareHouseList().then((response) => {
        this.productwareHouseOptions = [];
        let list = response.data;
        for (let i = 0; i < list.length; i++) {
          this.productwareHouseOptions.push({
            label: list[i].warehouseName,
            value: list[i].warehouseId,
          });
        }
      });
    },
    handlePrev() {
      this.$emit("prevStep");
    },
    handleFinishCommit() {
      this.$emit("finishCommit", this.isEdit);
    },
  },
};
</script>

<style scoped>
</style>
