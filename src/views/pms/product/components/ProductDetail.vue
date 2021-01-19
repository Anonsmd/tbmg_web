<template>
   
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品属性"></el-step>
    </el-steps>
    <product-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
    >
    </product-info-detail>
    <product-attr-detail
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      @prevStep="prevStep"
    >
    </product-attr-detail>
    <!-- <product-relation-detail
      v-show="showStatus[2]"
      v-model="productParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      @finishCommit="finishCommit"
    >
    </product-relation-detail> -->
  </el-card>
</template>
<script>
import ProductInfoDetail from "./ProductInfoDetail";
import ProductAttrDetail from "./ProductAttrDetail";
import ProductRelationDetail from "./ProductRelationDetail";
import { createWareHouse, getProduct, updateProduct } from "@/api/product";

const defaultProductParam = {
  //商品名称
  productName: "",
  //商品描述
  descript: "",
  //商品编码 max16
  productCore: "",
  //商品条形码 max50
  barCode: "",
  //品牌表的ID
  brandId: null,
  //一级分类ID
  oneCategoryId: null,
  //二级分类ID
  twoCategoryId: null,
  //三级分类ID
  threeCategoryId: null,

  //商品的供应商ID
  supplierId: 0,
  //商品销售价格
  price: 0,
  //商品加权平均成本
  averageCost: 0,
  //商品重量
  weight: 0,
  //商品长度
  length: 0,
  //商品高度
  height: 0,
  //商品宽度
  width: 0,
  //十六进制web颜色
  color: 0,
  //生产日期
  productionDate: null,
  //商品有效期
  shelfLife: 0,

  //仓库库存
  stock: {
    warehouseId: null,
    productId: null,
    currentCnt: null,
    sellCnt: null,
    averageCost: null,
  },
};
export default {
  name: "ProductDetail",
  components: {
    ProductInfoDetail,
    ProductAttrDetail,
    ProductRelationDetail,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: 0,
      productParam: Object.assign({}, defaultProductParam),
      showStatus: [true, false, false, false],
    };
  },
  created() {
    if (this.isEdit) {
      getProduct(this.$route.query.id).then((response) => {
        this.productParam = response.data;
        this.productParam.stock = {
          warehouseId: 1,
          productId: this.productParam.productId,
          currentCnt: this.productParam.stockNum,
          sellCnt: this.productParam.sellNum,
          averageCost: null,
        };
      });
    }
  },
  methods: {
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false;
      }
    },
    prevStep() {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    finishCommit(isEdit) {
      //   this.$confirm("是否要提交该产品", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   }).then(() => {
      //     console.log(typeof this.productParam.productionDate);
      //     console.log(typeof this.productParam.modifiedTime);
      //     createWareHouse(this.productParam.stock).then((response) => {
      //       this.$message({
      //         type: "success",
      //         message: "提交成功",
      //         duration: 1000,
      //       });
      //        location.reload();
      //     });
      //   });
      location.reload();
    },
  },
};
</script>
<style>
.form-container {
  width: 800px;
}
</style>


