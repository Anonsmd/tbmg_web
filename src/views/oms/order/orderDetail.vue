<template>
   
  <div class="detail-container">
    <div>
      <el-steps
        :active="formatStepStatus(order.orderDetail.orderStatus)"
        finish-status="success"
        align-center
      >
        <el-step
          title="提交订单"
          :description="formatTime(order.createTime)"
        ></el-step>
        <el-step
          title="支付订单"
          :description="formatTime(order.paymentTime)"
        ></el-step>
        <el-step
          title="平台发货"
          :description="formatTime(order.deliveryTime)"
        ></el-step>
        <el-step
          title="确认收货"
          :description="formatTime(order.receiveTime)"
        ></el-step>
        <el-step
          title="完成评价"
          :description="formatTime(order.commentTime)"
        ></el-step>
      </el-steps>
    </div>
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger"
          >当前订单状态：{{
            order.orderDetail.orderStatus | formatStatus
          }}</span
        >
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">订单编号</el-col>
          <el-col :span="4" class="table-cell-title">发货单流水号</el-col>
          <el-col :span="4" class="table-cell-title">用户账号</el-col>
          <el-col :span="4" class="table-cell-title">支付方式</el-col>
          <el-col :span="4" class="table-cell-title">订单来源</el-col>
          <el-col :span="4" class="table-cell-title">订单类型</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{
            order.orderDetail.orderSn
          }}</el-col>
          <el-col :span="4" class="table-cell">暂无</el-col>
          <el-col :span="4" class="table-cell">{{
            order.orderShippingInfo.loginName
          }}</el-col>
          <el-col :span="4" class="table-cell">{{
            order.paymentMethod | formatPayType
          }}</el-col>
          <el-col :span="4" class="table-cell">{{
            order.sourceType | formatSourceType
          }}</el-col>
          <el-col :span="4" class="table-cell">{{
            order.orderType | formatOrderType
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">配送方式</el-col>
          <el-col :span="4" class="table-cell-title">物流单号</el-col>
          <el-col :span="4" class="table-cell-title">自动确认收货时间</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{
            order.orderDetail.shippingCompName | formatNull
          }}</el-col>
          <el-col :span="4" class="table-cell">{{
            order.orderDetail.shippingSn | formatNull
          }}</el-col>
          <el-col :span="4" class="table-cell">15 天</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">收货人信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">收货人</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="6" class="table-cell-title">收货地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{
            order.orderShippingInfo.loginName
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            order.orderShippingInfo.mobilePhone
          }}</el-col>
          <el-col :span="6" class="table-cell">{{
            order.orderShippingInfo.address | formatAddress
          }}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品信息</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="order.orderItemList"
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
            <!-- <p>品牌：{{ scope.row.productBrand }}</p> -->
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
            {{ scope.row.productQuantity }}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{ scope.row.price * scope.row.productQuantity }}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right; margin: 20px">
        合计：<span class="color-danger"
          >￥{{
            order.orderItemList[0].price *
            order.orderItemList[0].productQuantity
          }}</span
        >
      </div>
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">费用信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >￥{{ order.orderDetail.orderMoney }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >￥{{ order.orderDetail.shippingMoney }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >￥{{ order.orderDetail.couponMoney }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >￥{{ order.orderDetail.orderMoney }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >￥{{ order.orderDetail.paymentMoney }}</el-col
          >
        </el-row>
      </div>
    </el-card>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>
<script>
import {
  getOrderDetail,
  updateReceiverInfo,
  updateMoneyInfo,
  closeOrder,
  updateOrderNote,
  deleteOrder,
} from "@/api/order";
import LogisticsDialog from "@/views/oms/order/components/logisticsDialog";
import { formatDate } from "@/utils/date";
import VDistpicker from "v-distpicker";
const defaultReceiverInfo = {
  orderId: null,
  receiverName: null,
  receiverPhone: null,
  receiverPostCode: null,
  receiverDetailAddress: null,
  receiverProvince: null,
  receiverCity: null,
  receiverRegion: null,
  status: null,
};
export default {
  name: "orderDetail",
  components: { VDistpicker, LogisticsDialog },
  data() {
    return {
      id: null,
      order: {},
      receiverDialogVisible: false,
      receiverInfo: Object.assign({}, defaultReceiverInfo),
      moneyDialogVisible: false,
      moneyInfo: {
        orderId: null,
        freightAmount: 0,
        discountAmount: 0,
        status: null,
      },
      messageDialogVisible: false,
      message: { title: null, content: null },
      closeDialogVisible: false,
      closeInfo: { note: null, id: null },
      markOrderDialogVisible: false,
      markInfo: { note: null },
      logisticsDialogVisible: false,
    };
  },
  created() {
    this.orderDetailId = this.$route.query.orderDetailId;
    getOrderDetail(this.orderDetailId).then((response) => {
      this.order = response.data;
      this.order.orderItemList = [];
      this.order.orderItemList.push(response.data.productInfo);
      let totalPrice = this.order.orderDetail.orderMoney;
      let price = this.order.productInfo.price;
      this.order.orderItemList[0].productQuantity = parseInt(
        (price - 1 + totalPrice) / price
      );
    });
  },
  filters: {
    formatNull(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else {
        return value;
      }
    },
    formatLongText(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else if (value.length > 8) {
        return value.substr(0, 8) + "...";
      } else {
        return value;
      }
    },
    formatPayType(value) {
      if (value === 1) {
        return "现金";
      } else if (value === 2) {
        return "余额";
      } else if (value === 3) {
        return "网银";
      } else if (value === 4) {
        return "支付宝";
      } else if (value === 5) {
        return "微信";
      } else {
        return "未支付";
      }
    },
    formatSourceType(value) {
      if (value === 1) {
        return "APP订单";
      } else {
        return "PC订单";
      }
    },
    formatOrderType(value) {
      if (value === 1) {
        return "秒杀订单";
      } else {
        return "正常订单";
      }
    },
    formatAddress(value) {
      if (value === undefined || value === null || value === "") {
        return "暂无";
      } else {
        return value;
      }
    },
    formatStatus(value) {
      if (value === 0) {
        return "已关闭";
      } else if (value === 1) {
        return "已支付";
      } else if (value === 2) {
        return "已发货";
      } else if (value === 3) {
        return "已接受";
      } else if (value === 4) {
        return "已结束";
      } else {
        return "无效订单";
      }
    },
    formatPayStatus(value) {
      if (value === 0) {
        return "未支付";
      } else if (value === 4) {
        return "已退款";
      } else {
        return "已支付";
      }
    },
    formatDeliverStatus(value) {
      if (value === 0 || value === 1) {
        return "未发货";
      } else {
        return "已发货";
      }
    },
    formatProductAttr(value) {
      if (value == null) {
        return "";
      } else {
        let attr = JSON.parse(value);
        let result = "";
        for (let i = 0; i < attr.length; i++) {
          result += attr[i].key;
          result += ":";
          result += attr[i].value;
          result += ";";
        }
        return result;
      }
    },
  },
  methods: {
    onSelectRegion(data) {
      this.receiverInfo.receiverProvince = data.province.value;
      this.receiverInfo.receiverCity = data.city.value;
      this.receiverInfo.receiverRegion = data.area.value;
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatStepStatus(value) {
      if (value === 1) {
        //待发货
        return 2;
      } else if (value === 2) {
        //已发货
        return 3;
      } else if (value === 3) {
        //已完成
        return 4;
      } else {
        //待付款、已关闭、无限订单
        return 1;
      }
    },
    showUpdateReceiverDialog() {
      this.receiverDialogVisible = true;
      this.receiverInfo = {
        orderId: this.order.id,
        receiverName: this.order.receiverName,
        receiverPhone: this.order.receiverPhone,
        receiverPostCode: this.order.receiverPostCode,
        receiverDetailAddress: this.order.receiverDetailAddress,
        receiverProvince: this.order.receiverProvince,
        receiverCity: this.order.receiverCity,
        receiverRegion: this.order.receiverRegion,
        status: this.order.status,
      };
    },
    handleUpdateReceiverInfo() {
      this.$confirm("是否要修改收货信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateReceiverInfo(this.receiverInfo).then((response) => {
          this.receiverDialogVisible = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    showUpdateMoneyDialog() {
      this.moneyDialogVisible = true;
      this.moneyInfo.orderId = this.order.id;
      this.moneyInfo.freightAmount = this.order.freightAmount;
      this.moneyInfo.discountAmount = this.order.discountAmount;
      this.moneyInfo.status = this.order.status;
    },
    handleUpdateMoneyInfo() {
      this.$confirm("是否要修改费用信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateMoneyInfo(this.moneyInfo).then((response) => {
          this.moneyDialogVisible = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    showMessageDialog() {
      this.messageDialogVisible = true;
      this.message.title = null;
      this.message.content = null;
    },
    handleSendMessage() {
      this.$confirm("是否要发送站内信?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.messageDialogVisible = false;
        this.$message({
          type: "success",
          message: "发送成功!",
        });
      });
    },
    showCloseOrderDialog() {
      this.closeDialogVisible = true;
      this.closeInfo.note = null;
      this.closeInfo.id = this.id;
    },
    handleCloseOrder() {
      this.$confirm("是否要关闭?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", [this.closeInfo.id]);
        params.append("note", this.closeInfo.note);
        closeOrder(params).then((response) => {
          this.closeDialogVisible = false;
          this.$message({
            type: "success",
            message: "订单关闭成功!",
          });
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    showMarkOrderDialog() {
      this.markOrderDialogVisible = true;
      this.markInfo.id = this.id;
      this.closeOrder.note = null;
    },
    handleMarkOrder() {
      this.$confirm("是否要备注订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("id", this.markInfo.id);
        params.append("note", this.markInfo.note);
        params.append("status", this.order.status);
        updateOrderNote(params).then((response) => {
          this.markOrderDialogVisible = false;
          this.$message({
            type: "success",
            message: "订单备注成功!",
          });
          getOrderDetail(this.id).then((response) => {
            this.order = response.data;
          });
        });
      });
    },
    handleDeleteOrder() {
      this.$confirm("是否要进行该删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", [this.id]);
        deleteOrder(params).then((response) => {
          this.$message({
            message: "删除成功！",
            type: "success",
            duration: 1000,
          });
          this.$router.back();
        });
      });
    },
    showLogisticsDialog() {
      this.logisticsDialogVisible = true;
    },
  },
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


