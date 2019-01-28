<template>
  <div class="panel realTimeContainer">
    <el-row>
      <el-col :span="6">
        <panel-title :title="$route.meta.title"></panel-title>
      </el-col>
      <el-col :span="18" class="dateStyle">
        <span class="refresh" @click="refreshOwn()">
          <i class="el-icon-refresh" size="middle"></i>
        </span>
        修改日期
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="cTitle">
          <p class="text1">GMV</p>
          <p class="text2">2019-01-03~2019-01-03|今日</p>
          <p class="text3">{{orderAmount}}</p>
          <p class="text4">
            同比
            <i class="el-icon-caret-bottom" style="color: red;"></i>
            <span style="color: red; padding-right: 40px;">29.14%</span>
            环比
            <i class="el-icon-caret-bottom" style="color: red;"></i>
            <span style="color: red;">25.37%</span>
          </p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="cTitle">
          <p class="text1">订单数量</p>
          <p class="text2">2019-01-03~2019-01-03|今日</p>
          <p class="text3">{{orderCount}}次</p>
          <p class="text4">
            同比
            <i class="el-icon-caret-top" style="color: green;"></i>
            <span style="color: green; padding-right: 40px;">29.14%</span>
            环比
            <i class="el-icon-caret-top" style="color: green;"></i>
            <span style="color: green;">25.37%</span>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="cTitle">
          <p class="text1">下单人数</p>
          <p class="text2">2019-01-03~2019-01-03|今日</p>
          <p class="text3">{{orderUsersCount}}人</p>
          <p class="text4">
            同比
            <i class="el-icon-caret-bottom" style="color: red;"></i>
            <span style="color: red; padding-right: 40px;">29.14%</span>
            环比
            <i class="el-icon-caret-bottom" style="color: red;"></i>
            <span style="color: red;">25.37%</span>
          </p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="cTitle">
          <p class="text1">客单价</p>
          <p class="text2">2019-01-03~2019-01-03|今日</p>
          <p class="text3">{{orderAmountPerUser}}</p>
          <p class="text4">
            同比
            <i class="el-icon-caret-bottom" style="color: red;"></i>
            <span style="color: red; padding-right: 40px;">29.14%</span>
            环比
            <i class="el-icon-caret-bottom" style="color: red;"></i>
            <span style="color: red;">25.37%</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components';
  import { getMsg } from "../../api/api";

  export default{
    data(){
      return {
        dateValue: '',
        orderAmount: null,
        orderAmountPerUser: null,
        orderCount: null,
        orderUsersCount: null
      }
    },
    components: {
      panelTitle
    },
    mounted() {
      getMsg('/event/data').then(response => {
        console.log('********response', response);
        this.orderAmount = response.data.data.orderAmount,
        this.orderAmountPerUser = response.data.data.orderAmountPerUser,
        this.orderCount = response.data.data.orderCount,
        this.orderUsersCount = response.data.data.orderUsersCount
      }).catch(error=>{
        console.log(error);
      });
    },
    methods: {
      refreshOwn() {
        window.location.reload();
      }
    },
    watch: {
      dateValue(val) {
        console.log('*********datavale', val[0], val[1]);
      }
    }
  }
</script>
<style scoped>
  .realTimeContainer {
    background-color: #EEF3FF !important;
  }
  .refresh {
    border: 1px solid #bbb;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
  }
  .dateStyle {
    line-height: 76.4px;
    padding-right: 50px;
    text-align: right;
  }
  .cTitle {
    margin: 10px;
    background-color: #fff;
    margin:20px 50px;
    height: 248px;
    border-radius: 5px;
  }
  .text1 {
    /* height: 40px; */
    padding: 8px 0 10px 22px;
    font-size: 28px;
    font-family: SourceHanSansSC-regular;
  }
  .text2 {
    /* height: 29px; */
    padding: 0 0 24px 22px;
    font-size: 20px;
    font-family: SourceHanSansSC-regular;
  }
  .text3 {
    /* height: 107px; */
    padding: 0 0 9px 22px;
    font-size: 72px;
    font-family: SourceHanSansSC-regular;
  }
  .text4 {
    /* height: 26px; */
    padding: 24px 0 19px 22px;
    font-size: 20px;
    font-family: SourceHanSansSC-regular;
  }
</style>