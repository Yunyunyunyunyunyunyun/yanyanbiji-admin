<template>
  <div class="panel realTimeContainer">
    <el-row>
      <el-col :span="6">
        <panel-title :title="$route.meta.title"></panel-title>
      </el-col>
      <el-col :span="18" class="dateStyle">
        <span class="refresh">
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
          <p class="text1">研究生申请数</p>
          <p class="text2">{{timeOne}}</p>
          <p class="text3">{{dataOne}}次</p>
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
          <p class="text1">研究生占比</p>
          <p class="text2">{{timeTwo}}</p>
          <p class="text3">{{dataTwo}}%</p>
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
          <p class="text1">问题查看次数</p>
          <p class="text2">{{timeThree}}</p>
          <p class="text3">{{dataThree}}次</p>
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
          <p class="text1">答案采纳率</p>
          <p class="text2">{{timeFour}}</p>
          <p class="text3">{{dataFour}}%</p>
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
        dataOne: null,
        dataTwo: null,
        dataThree: null,
        dataFour: null,
        timeOne: null,
        timeTwo: null,
        timeThree: null,
        timeFour: null
      }
    },
    components: {
      panelTitle
    },
    mounted() {
      this.getCurrencyMsg('/userBehavior/data');
    },
    methods: {
      getCurrencyMsg(path, params) {
        getMsg(path, params).then(response => {
          this.dataOne = response.data.data[0].data;
          this.dataTwo = response.data.data[1].data;
          this.dataThree = response.data.data[2].data;
          this.dataFour = response.data.data[3].data;
          this.timeOne = response.data.data[3].time,
          this.timeTwo = response.data.data[3].time,
          this.timeThree = response.data.data[3].time,
          this.timeFour = response.data.data[3].time
        }).catch(error=>{
          console.log(error);
        });
      },
      dateToString(now){
        var year = now.getFullYear();
        var month =(now.getMonth() + 1).toString();
        var day = (now.getDate()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        var dateTime = year + "-" + month + "-" + day;
        return dateTime;
      }
    },
    watch: {
      dateValue(val) {
        console.log('*********datavale', val[0], val[1]);
        var start = this.dateToString(val[0]);
        var end = this.dateToString(val[1]);
        this.getCurrencyMsg('/userBehavior/data', 'startTime=' + start + '&endTime=' + end);
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