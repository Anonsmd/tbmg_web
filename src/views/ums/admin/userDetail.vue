<template>
   
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">用户编号</el-col>
          <el-col :span="6" class="table-cell-title">用户名</el-col>
          <el-col :span="6" class="table-cell-title">账号状态</el-col>
          <el-col :span="6" class="table-cell-title">账号修改时间</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{
            customer.customerLogin.customerId
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            customer.customerLogin.loginName
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            customer.customerLogin.userStats | formatStatus
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            customer.customerLogin.modifiedTime | formatGMT
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">姓名</el-col>
          <el-col :span="6" class="table-cell-title">手机号</el-col>
          <el-col :span="6" class="table-cell-title">电子邮件</el-col>
          <el-col :span="6" class="table-cell-title">性别</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{
            customer.customerInf.customerName
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            customer.customerInf.mobilePhone
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            customer.customerInf.customerEmail
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            customer.customerInf.gender
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">注册时间</el-col>
          <el-col :span="6" class="table-cell-title">生日</el-col>
          <el-col :span="6" class="table-cell-title">证件类型</el-col>
          <el-col :span="6" class="table-cell-title">证件号码</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{
            customer.customerInf.registerTime | formatGMT
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            customer.customerInf.birthday | formatTime2
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            customer.customerInf.identityCardType | formatidentityType
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            customer.customerInf.identityCardNo
          }}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">账户信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="7" class="table-cell-title">会员等级</el-col>
          <el-col :span="7" class="table-cell-title">会员积分</el-col>
          <el-col :span="7" class="table-cell-title">余额</el-col>
        </el-row>
        <el-row>
          <el-col :span="7" class="table-cell">{{
            customer.customerInf.customerLevel | formatLevel
          }}</el-col>
          <el-col :span="7" class="table-cell">{{
            customer.customerInf.userPoint
          }}</el-col>
          <el-col :span="7" class="table-cell">{{
            customer.customerInf.userMoney
          }}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">地址信息</span>
      </div>
      <el-table
        ref="customerAddressItemTable"
        :data="customer.adderList"
        style="width: 100%; margin-top: 20px"
        border
      >
        <el-table-column label="省份" width="220" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.province }}</p>
          </template>
        </el-table-column>
        <el-table-column label="城市" width="220" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.city }}</p>
          </template>
        </el-table-column>
        <el-table-column label="区" width="220" align="center">
          <template slot-scope="scope">
            {{ scope.row.district }}
          </template>
        </el-table-column>
        <el-table-column label="地址" width="220" align="center">
          <template slot-scope="scope">
            {{ scope.row.address }}
          </template>
        </el-table-column>
        <el-table-column label="邮编" width="220" align="center">
          <template slot-scope="scope">
            {{ scope.row.zip }}
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">购物车</span>
      </div>
      <el-table
        ref="customerProductItemTable"
        :data="customer.productList"
        style="width: 100%; margin-top: 20px"
        border
      >
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" style="height: 80px" />
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.productName }}</p>
            <p>{{ scope.row.descript }}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">
            <p>价格：￥{{ scope.row.price }}</p>
            <p>货号：{{ scope.row.productCore }}</p>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.productAmount }}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{ scope.row.price * scope.row.productAmount }}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right; margin: 20px">
        合计：<span class="color-danger">￥{{ customer.totalMoney }}</span>
      </div>
    </el-card>
  </div>
</template>
<script>
import { fetchCustomerInfoList } from "@/api/login";
import { formatDate } from "@/utils/date";
export default {
  name: "userDetail",
  data() {
    return {
      customerId: null,
      customer: {},
    };
  },
  created() {
    this.customerId = this.$route.query.customerId;
    fetchCustomerInfoList(this.customerId).then((response) => {
      this.customer = response.data;
      this.customer.adderList = [];
      this.customer.adderList.push(response.data.customerAddr);
      let totalMoney = 0;
      for (let i = 0; i < this.customer.productList.length; i++) {
        totalMoney =
          totalMoney +
          this.customer.productList[i].productAmount *
            this.customer.productList[i].price;
      }
      this.customer.totalMoney = totalMoney;
    });
  },
  filters: {
    formatLevel(value) {
      if (value === 0) {
        return "非会员";
      } else if (value === 1) {
        return "普通会员";
      } else if (value === 2) {
        return "黄金会员";
      } else {
        return "普通会员";
      }
    },
    formatStatus(value) {
      if (value === 1) {
        return "启用";
      } else {
        return "弃用";
      }
    },
    formatidentityType(value) {
      if (value === 1) {
        return "身份证";
      } else if (value === 2) {
        return "军官证";
      } else if (value === 3) {
        return "护照";
      } else {
        return "无效证件";
      }
    },
    formatTime(time) {
      console.log(time);
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatTime2(time) {
      console.log(time);
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    formatGMT(time) {
      let formated = new Date(time);
      console.log(formated);
      return formated.toLocaleString();
    },
  },
  methods: {},
};
</script>
<style scoped>
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>


