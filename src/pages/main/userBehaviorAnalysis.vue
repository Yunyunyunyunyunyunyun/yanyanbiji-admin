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
          <p class="text1">研究生申请数</p>
          <p class="text2">{{timeOne}}</p>
          <p class="text3">{{dataOne}}<span class="smallFont">次</span></p>
          <p class="text4">
            同比
            <i v-if="samePeriodOne < 0" class="el-icon-caret-bottom" :class="samePeriodOne < 0 ? 'green' : 'red'"></i>
            <i v-else class="el-icon-caret-top" :class="samePeriodOne < 0 ? 'green' : 'red'"></i>
            <span style="padding-right: 40px;" :class="samePeriodOne < 0 ? 'green' : 'red'">{{samePeriodOne}}<span v-show="samePeriodOne">%</span></span>
            环比
            <i v-if="sequentialGrowthOne < 0" class="el-icon-caret-bottom" :class="sequentialGrowthOne < 0 ? 'green' : 'red'"></i>
            <i v-else class="el-icon-caret-top" :class="sequentialGrowthOne < 0 ? 'green' : 'red'"></i>
            <span :class="sequentialGrowthOne < 0 ? 'green' : 'red'">{{sequentialGrowthOne}}<span v-show="sequentialGrowthOne">%</span></span>
          </p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="cTitle">
          <p class="text1">研究生占比</p>
          <p class="text2">{{timeTwo}}</p>
          <p class="text3">{{dataTwo}}<span class="smallFont">%</span></p>
          <p class="text4">
            同比
            <i v-if="samePeriodTwo < 0" class="el-icon-caret-bottom" :class="samePeriodTwo < 0 ? 'green' : 'red'"></i>
            <i v-else class="el-icon-caret-top" :class="samePeriodTwo < 0 ? 'green' : 'red'"></i>
            <span style="padding-right: 40px;" :class="samePeriodTwo < 0 ? 'green' : 'red'">{{samePeriodTwo}}<span v-show="samePeriodTwo">%</span></span>
            环比
            <i v-if="sequentialGrowthTwo < 0" class="el-icon-caret-bottom" :class="sequentialGrowthTwo < 0 ? 'green' : 'red'"></i>
            <i v-else class="el-icon-caret-top" :class="sequentialGrowthTwo < 0 ? 'green' : 'red'"></i>
            <span :class="sequentialGrowthTwo < 0 ? 'green' : 'red'">{{sequentialGrowthTwo}}<span v-show="sequentialGrowthTwo">%</span></span>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="cTitle">
          <p class="text1">问题查看次数</p>
          <p class="text2">{{timeThree}}</p>
          <p class="text3">{{dataThree}}<span class="smallFont">次</span></p>
          <p class="text4">
            同比
            <i v-if="samePeriodThree < 0" class="el-icon-caret-bottom" :class="samePeriodThree < 0 ? 'green' : 'red'"></i>
            <i v-else class="el-icon-caret-top" :class="samePeriodThree < 0 ? 'green' : 'red'"></i>
            <span style="padding-right: 40px;" :class="samePeriodThree < 0 ? 'green' : 'red'">{{samePeriodThree}}<span v-show="samePeriodThree">%</span></span>
            环比
            <i v-if="sequentialGrowthThree < 0" class="el-icon-caret-bottom" :class="sequentialGrowthThree < 0 ? 'green' : 'red'"></i>
            <i v-else class="el-icon-caret-top" :class="sequentialGrowthThree < 0 ? 'green' : 'red'"></i>
            <span :class="sequentialGrowthThree < 0 ? 'green' : 'red'">{{sequentialGrowthThree}}<span v-show="sequentialGrowthThree">%</span></span>
          </p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="cTitle">
          <p class="text1">答案采纳率</p>
          <p class="text2">{{timeFour}}</p>
          <p class="text3">{{dataFour}}<span class="smallFont">%</span></p>
          <p class="text4">
            同比
            <i v-if="samePeriodFour < 0" class="el-icon-caret-bottom" :class="samePeriodFour < 0 ? 'green' : 'red'"></i>
            <i v-else class="el-icon-caret-top" :class="samePeriodFour < 0 ? 'green' : 'red'"></i>
            <span style="padding-right: 40px;" :class="samePeriodFour < 0 ? 'green' : 'red'">{{samePeriodFour}}<span v-show="samePeriodFour">%</span></span>
            环比
            <i v-if="sequentialGrowthFour < 0" class="el-icon-caret-bottom" :class="sequentialGrowthFour < 0 ? 'green' : 'red'"></i>
            <i v-else class="el-icon-caret-top" :class="sequentialGrowthFour < 0 ? 'green' : 'red'"></i>
            <span :class="sequentialGrowthFour < 0 ? 'green' : 'red'">{{sequentialGrowthFour}}<span v-show="sequentialGrowthFour">%</span></span>
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
        timeFour: null,
        samePeriodOne: null,
        samePeriodTwo: null,
        samePeriodThree: null,
        samePeriodFour: null,
        sequentialGrowthOne: null,
        sequentialGrowthTwo: null,
        sequentialGrowthThree: null,
        sequentialGrowthFour: null
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
          this.timeFour = response.data.data[3].time,
          this.samePeriodOne = response.data.data[0].samePeriod,
          this.samePeriodTwo = response.data.data[1].samePeriod,
          this.samePeriodThree = response.data.data[2].samePeriod,
          this.samePeriodFour = response.data.data[3].samePeriod,
          this.sequentialGrowthOne = response.data.data[0].sequentialGrowth,
          this.sequentialGrowthTwo = response.data.data[1].sequentialGrowth,
          this.sequentialGrowthThree = response.data.data[2].sequentialGrowth,
          this.sequentialGrowthFour = response.data.data[3].sequentialGrowth
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
      },
      refreshOwn() {
        window.location.reload();
      }
    },
    watch: {
      dateValue(val) {
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
    padding: 8px 0 10px 22px;
    font-size: 28px;
    font-family: SourceHanSansSC-regular;
  }
  .text2 {
    padding: 0 0 24px 22px;
    font-size: 20px;
    font-family: SourceHanSansSC-regular;
  }
  .text3 {
    padding: 0 0 9px 22px;
    font-size: 72px;
    font-family: SourceHanSansSC-regular;
  }
  .text4 {
    padding: 24px 0 19px 22px;
    font-size: 20px;
    font-family: SourceHanSansSC-regular;
  }
  .green {
    color: green;
  }
  .red {
    color: red;
  }
  .smallFont {
    font-size: 28px;
  }
</style>