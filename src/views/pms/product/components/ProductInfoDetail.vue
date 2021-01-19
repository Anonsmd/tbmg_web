<template>
  <div style="margin-top: 50px">
    <el-form
      :model="value"
      :rules="rules"
      ref="productInfoForm"
      label-width="120px"
      style="width: 600px"
      size="small"
    >
      <el-form-item label="商品名称：" prop="productName">
        <el-input v-model="value.productName"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="descript">
        <el-input v-model="value.descript"></el-input>
      </el-form-item>
      <el-form-item label="商品编码：" prop="productCore">
        <el-input v-model="value.productCore"></el-input>
      </el-form-item>
      <el-form-item label="商品条形码：" prop="barCode">
        <el-input v-model="value.barCode"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌：" prop="brandId">
        <el-select
          v-model="value.brandId"
          @change="handleBrandChange"
          placeholder="请选择品牌"
        >
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品一级分类：" prop="oneCategoryId">
        <el-select
          v-model="value.oneCategoryId"
          @change="handleCategory0Change"
          placeholder="请选择一级分类"
        >
          <el-option
            v-for="item in productCateOptions0"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品二级分类：" prop="twoCategoryId">
        <el-select
          v-model="value.twoCategoryId"
          @change="handleCategory1Change"
          placeholder="请选择一级分类"
        >
          <el-option
            v-for="item in productCateOptions1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品三级分类：" prop="threeCategoryId">
        <el-select
          v-model="value.threeCategoryId"
          @change="handleCategory2Change"
          placeholder="请选择一级分类"
        >
          <el-option
            v-for="item in productCateOptions2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button
          type="primary"
          size="medium"
          @click="handleNext('productInfoForm')"
          >下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchListWithChildren } from "@/api/productCate";
import { fetchList as fetchBrandList } from "@/api/brand";
import { getProduct } from "@/api/product";

export default {
  name: "ProductInfoDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hasEditCreated: false,
      //选中商品分类的值
      selectProductCateValue: [],
      productCateOptions0: [],
      productCateOptions1: [],
      productCateOptions2: [],
      brandOptions: [],
      rules: {
        productName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        descript: [
          { required: true, message: "请输入商品副标题", trigger: "blur" },
        ],
        oneCategoryId: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
        twoCategoryId: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
        threeCategoryId: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
        brandId: [
          { required: true, message: "请选择商品品牌", trigger: "blur" },
        ],
        productCore: [
          { required: true, message: "请输入商品编码", trigger: "blur" },
        ],
        barCode: [{ required: true, message: "该项为必填项", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getProductCateList();
    this.getBrandList();
  },
  computed: {
    //商品的编号
    productId() {
      return this.value.productId;
    },
  },
  watch: {
    productId: function (newValue) {
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue === undefined || newValue == null || newValue === 0) return;
      this.handleEditCreated();
    },
  },
  methods: {
    //处理编辑逻辑
    handleEditCreated() {
      if (this.value.productCategoryId != null) {
        this.selectProductCateValue.push(this.value.cateParentId);
        this.selectProductCateValue.push(this.value.productCategoryId);
      }
      this.hasEditCreated = true;
    },
    getProductCateList() {
      fetchListWithChildren().then((response) => {
        let list = response.data;
        this.productCateOptions0 = [];
        this.productCateOptions1 = [];
        this.productCateOptions2 = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].categoryLevel == 0) {
            this.productCateOptions0.push({
              label: list[i].categoryName,
              value: list[i].categoryId,
              parent: null,
            });
          }
          if (list[i].categoryLevel == 1) {
            this.productCateOptions1.push({
              label: list[i].categoryName,
              value: list[i].categoryId,
              parent: list[i].parentId,
            });
          }
          if (list[i].categoryLevel == 2) {
            this.productCateOptions2.push({
              label: list[i].categoryName,
              value: list[i].categoryId,
              parent: list[i].parentId,
            });
          }
        }
      });
    },
    getBrandList() {
      fetchBrandList({ pageNum: 1, pageSize: 100 }).then((response) => {
        this.brandOptions = [];
        let brandList = response.data.list;
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({
            label: brandList[i].brandName,
            value: brandList[i].brandId,
          });
        }
        this.getBrandName();
      });
    },
    getCateNameById(id) {
      let name = null;
      for (let i = 0; i < this.productCateOptions.length; i++) {
        for (let j = 0; j < this.productCateOptions[i].children.length; j++) {
          if (this.productCateOptions[i].children[j].value === id) {
            name = this.productCateOptions[i].children[j].label;
            return name;
          }
        }
      }
      return name;
    },
    handleNext(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("nextStep");
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },
    handleBrandChange(val) {
      let brandName = "";
      for (let i = 0; i < this.brandOptions.length; i++) {
        if (this.brandOptions[i].value === val) {
          brandName = this.brandOptions[i].label;
          break;
        }
      }
      this.value.brandName = brandName;
    },
    handleCategory0Change(val) {
      let oneCategoryName = "";
      for (let i = 0; i < this.productCateOptions0.length; i++) {
        if (this.productCateOptions0[i].value === val) {
          oneCategoryName = this.productCateOptions0[i].label;
          break;
        }
      }
      //   this.value.oneCategoryName = oneCategoryName;
    },
    handleCategory1Change(val) {
      let twoCategoryName = "";
      for (let i = 0; i < this.productCateOptions1.length; i++) {
        if (this.productCateOptions1[i].value === val) {
          twoCategoryName = this.productCateOptions1[i].label;
          break;
        }
      }
      //   this.value.twoCategoryName = twoCategoryName;
    },
    handleCategory2Change(val) {
      let threeCategoryName = "";
      for (let i = 0; i < this.productCateOptions2.length; i++) {
        if (this.productCateOptions2[i].value === val) {
          threeCategoryName = this.productCateOptions2[i].label;
          break;
        }
      }
      //   this.value.threeCategoryName = threeCategoryName;
    },
  },
};
</script>

<style scoped>
</style>
