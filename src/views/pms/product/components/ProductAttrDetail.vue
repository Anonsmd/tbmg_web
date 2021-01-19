<template>
  <div style="margin-top: 50px">
    <el-form
      :model="value"
      :rules="rules"
      ref="productAttrForm"
      label-width="120px"
      style="width: 720px"
      size="small"
    >
      <el-form-item label="供货商" prop="supplierId">
        <el-select v-model="value.supplierId" placeholder="请选择供货商">
          <el-option
            v-for="item in productSupplierOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品售价：" prop="price">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="平均成本：" prop="averageCost">
        <el-input v-model="value.averageCost"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：">
        <el-input v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 20px">克</span>
      </el-form-item>
      <el-form-item label="商品长度：">
        <el-input v-model="value.length" style="width: 300px"></el-input>
        <span style="margin-left: 20px">厘米</span>
      </el-form-item>
      <el-form-item label="商品高度：">
        <el-input v-model="value.height" style="width: 300px"></el-input>
        <span style="margin-left: 20px">厘米</span>
      </el-form-item>
      <el-form-item label="商品宽度：">
        <el-input v-model="value.width" style="width: 300px"></el-input>
        <span style="margin-left: 20px">厘米</span>
      </el-form-item>
      <el-form-item label="商品颜色：" prop="color">
        <el-input v-model="value.color" style="width: 100px"></el-input>
        <el-color-picker v-model="value.color"></el-color-picker>
      </el-form-item>
      <el-form-item label="商品生产日期：" prop="productionDate">
        <!-- <el-input v-model="value.productionDate"></el-input> -->
        <el-date-picker
          v-model="value.productionDate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="商品有效期：" prop="shelfLife">
        <el-input v-model="value.shelfLife"></el-input>
      </el-form-item>
      <!-- <el-form-item label="规格参数：">
        <el-tabs v-model="activeHtmlName" type="card">
          <el-tab-pane label="电脑端详情" name="pc">
            <tinymce
              :width="595"
              :height="300"
              v-model="value.detailHtml"
            ></tinymce>
          </el-tab-pane>
          <el-tab-pane label="移动端详情" name="mobile">
            <tinymce
              :width="595"
              :height="300"
              v-model="value.detailMobileHtml"
            ></tinymce>
          </el-tab-pane>
        </el-tabs>
      </el-form-item> -->
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleNext"
          >提交商品</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchList as fetchProductAttrCateList } from "@/api/productAttrCate";
import { fetchList as fetchProductAttrList } from "@/api/productAttr";
import { fetchSupplierList, createProduct } from "@/api/product";
import SingleUpload from "@/components/Upload/singleUpload";
import MultiUpload from "@/components/Upload/multiUpload";
import Tinymce from "@/components/Tinymce";

export default {
  name: "ProductAttrDetail",
  components: { SingleUpload, MultiUpload, Tinymce },
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //编辑模式时是否初始化成功
      hasEditCreated: false,
      //商品属性分类下拉选项
      productSupplierOptions: [],
      //选中的商品属性
      selectProductAttr: [],
      //选中的商品参数
      selectProductParam: [],
      //选中的商品属性图片
      selectProductAttrPics: [],
      //可手动添加的商品属性
      addProductAttrValue: "",
      rules: {
        supplierId: [
          { required: true, message: "该项为必填项", trigger: "blur" },
        ],
        price: [{ required: true, message: "该项为必填项", trigger: "blur" }],
        averageCost: [
          { required: true, message: "该项为必填项", trigger: "blur" },
        ],
        weight: [{ required: true, message: "该项为必填项", trigger: "blur" }],
        length: [{ required: true, message: "该项为必填项", trigger: "blur" }],
        height: [{ required: true, message: "该项为必填项", trigger: "blur" }],
        width: [{ required: true, message: "该项为必填项", trigger: "blur" }],
        color: [{ required: true, message: "该项为必填项", trigger: "blur" }],
        productionDate: [
          { required: true, message: "该项为必填项", trigger: "blur" },
        ],
        shelfLife: [
          { required: true, message: "该项为必填项", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    //商品的编号
    productId() {
      return this.value.productId;
    },
  },
  created() {
    this.getSupplierList();
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
    getSupplierList() {
      fetchSupplierList({ pageNum: 1, pageSize: 100 }).then((response) => {
        this.productSupplierOptions = [];
        let supplierList = response.data;
        for (let i = 0; i < supplierList.length; i++) {
          this.productSupplierOptions.push({
            label: supplierList[i].supplierName,
            value: supplierList[i].supplierId,
          });
        }
      });
    },
    handleEditCreated() {
      //根据商品属性分类id获取属性和参数
      if (this.value.productAttributeCategoryId != null) {
        this.handleProductAttrChange(this.value.productAttributeCategoryId);
      }
      this.hasEditCreated = true;
    },
    getProductAttrList(type, cid) {
      let param = { pageNum: 1, pageSize: 100, type: type };
      fetchProductAttrList(cid, param).then((response) => {
        let list = response.data.list;
        if (type === 0) {
          this.selectProductAttr = [];
          for (let i = 0; i < list.length; i++) {
            let options = [];
            let values = [];
            if (this.isEdit) {
              if (list[i].handAddStatus === 1) {
                //编辑状态下获取手动添加编辑属性
                options = this.getEditAttrOptions(list[i].id);
              }
              //编辑状态下获取选中属性
              values = this.getEditAttrValues(i);
            }
            this.selectProductAttr.push({
              id: list[i].id,
              name: list[i].name,
              handAddStatus: list[i].handAddStatus,
              inputList: list[i].inputList,
              values: values,
              options: options,
            });
          }
          if (this.isEdit) {
            //编辑模式下刷新商品属性图片
            this.refreshProductAttrPics();
          }
        } else {
          this.selectProductParam = [];
          for (let i = 0; i < list.length; i++) {
            let value = null;
            if (this.isEdit) {
              //编辑模式下获取参数属性
              value = this.getEditParamValue(list[i].id);
            }
            this.selectProductParam.push({
              id: list[i].id,
              name: list[i].name,
              value: value,
              inputType: list[i].inputType,
              inputList: list[i].inputList,
            });
          }
        }
      });
    },
    //获取设置的可手动添加属性值
    getEditAttrOptions(id) {
      let options = [];
      for (let i = 0; i < this.value.productAttributeValueList.length; i++) {
        let attrValue = this.value.productAttributeValueList[i];
        if (attrValue.productAttributeId === id) {
          let strArr = attrValue.value.split(",");
          for (let j = 0; j < strArr.length; j++) {
            options.push(strArr[j]);
          }
          break;
        }
      }
      return options;
    },
    //获取选中的属性值
    getEditAttrValues(index) {
      let values = new Set();
      if (index === 0) {
        for (let i = 0; i < this.value.skuStockList.length; i++) {
          let sku = this.value.skuStockList[i];
          let spData = JSON.parse(sku.spData);
          if (spData != null && spData.length >= 1) {
            values.add(spData[0].value);
          }
        }
      } else if (index === 1) {
        for (let i = 0; i < this.value.skuStockList.length; i++) {
          let sku = this.value.skuStockList[i];
          let spData = JSON.parse(sku.spData);
          if (spData != null && spData.length >= 2) {
            values.add(spData[1].value);
          }
        }
      } else {
        for (let i = 0; i < this.value.skuStockList.length; i++) {
          let sku = this.value.skuStockList[i];
          let spData = JSON.parse(sku.spData);
          if (spData != null && spData.length >= 3) {
            values.add(spData[2].value);
          }
        }
      }
      return Array.from(values);
    },
    //获取属性的值
    getEditParamValue(id) {
      for (let i = 0; i < this.value.productAttributeValueList.length; i++) {
        if (id === this.value.productAttributeValueList[i].productAttributeId) {
          return this.value.productAttributeValueList[i].value;
        }
      }
    },
    handleProductAttrChange(value) {
      this.getProductAttrList(0, value);
      this.getProductAttrList(1, value);
    },
    refreshProductAttrPics() {
      this.selectProductAttrPics = [];
      if (this.selectProductAttr.length >= 1) {
        let values = this.selectProductAttr[0].values;
        for (let i = 0; i < values.length; i++) {
          let pic = null;
          if (this.isEdit) {
            //编辑状态下获取图片
            pic = this.getProductSkuPic(values[i]);
          }
          this.selectProductAttrPics.push({ name: values[i], pic: pic });
        }
      }
    },
    //获取商品相关属性的图片
    getProductSkuPic(name) {
      for (let i = 0; i < this.value.skuStockList.length; i++) {
        let spData = JSON.parse(this.value.skuStockList[i].spData);
        if (name === spData[0].value) {
          return this.value.skuStockList[i].pic;
        }
      }
      return null;
    },
    handlePrev() {
      this.$emit("prevStep");
    },
    handleNext() {
      console.log(this.value.productId);
      this.$confirm("是否要提交该产品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        createProduct(this.value).then((response) => {
          let outId = response.data.productId;
          console.log(outId);
          console.log(response.data);
          this.value.stock.productId = outId;
          this.$message({
            type: "success",
            message: "提交成功",
            duration: 1000,
          });
          //   location.reload();
        });
        // this.$emit("nextStep");
        this.$emit("finishCommit", this.isEdit);
      });
    },
  },
};
</script>

<style scoped>
.littleMarginLeft {
  margin-left: 10px;
}

.littleMarginTop {
  margin-top: 10px;
}

.paramInput {
  width: 250px;
}

.paramInputLabel {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 10px;
}

.cardBg {
  background: #f8f9fc;
}
</style>
