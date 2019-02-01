<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <div class="searchContainer">
        <el-row>
          <el-col :span="1" style="min-width: 50px;">搜索：</el-col>
          <el-col :span="6">
            <el-input
              class="searchInput"
              size="small"
              placeholder="输入关键字"
              suffix-icon="el-icon-search"
              v-model="input">
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" size="small" class="searchBtn" @click="searchKey()">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="condition">
        <el-row>
          <el-col :span="1" style="min-width: 50px;">筛选：</el-col>
          <el-col :span="2" style="width: 60px;">采纳率</el-col>
          <el-col :span="4">
            <el-select v-model="adoptionRate" size="small">
              <el-option v-for="item in adoptionRates" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width: 80px;">问题状态</el-col>
          <el-col :span="4">
            <el-select v-model="problemState" size="small">
              <el-option v-for="item in problemStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="total">
        <el-row>
          <el-col :span="15" style="min-width: 150px;">（共{{pageTotal}}条消息）</el-col>
          <el-col :span="9" align="right">
            <el-button size="small" class="del" @click="delMsg()">删除</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="tableTotal">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          :row-key="getRowKeys"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            :reserve-selection="true"
            align="center">
          </el-table-column>
          <el-table-column
            label="询问者ID"
            show-overflow-tooltip
            align="center">
            <template slot-scope="scope">{{ scope.row.creatorId }}</template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="询问标题"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="specialty"
            label="问题专业"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="course"
            label="问题科目"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="问题状态"
            show-overflow-tooltip
            align="center"
            :formatter="formatStatus">
          </el-table-column>
          <el-table-column
            prop="acceptPersent"
            label="采纳率"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="selectedNum">
        已选中{{multipleSelection.length}}条
      </div>
      <div class="block paginateStyle">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper, total"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="问题详情" :visible.sync="dialogVisible" width="90%">
      <div class="details firstDetails">
        <el-row>
          <el-col :span="2" style="width: 80px;">询问者ID</el-col>
          <el-col :span="4" style="margin-right: 20px;">
            <el-input
              :disabled="true"
              v-model="contentDetails.creatorId">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 80px;">询问时间</el-col>
          <el-col :span="4" style="margin-right: 20px;">
            <el-input
              :disabled="true"
              v-model="contentDetails.createTime">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 80px;">问题专业</el-col>
          <el-col :span="4" style="margin-right: 20px;">
            <el-input
              :disabled="true"
              v-model="contentDetails.specialty">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 80px;">问题科目</el-col>
          <el-col :span="4">
            <el-input
              :disabled="true"
              v-model="contentDetails.course">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="details">
        <el-row>
          <el-col :span="2" style="width: 80px;">问题标题</el-col>
          <el-col :span="8" style="margin-right: 20px;">
            <el-input
              :disabled="true"
              v-model="contentDetails.title">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 80px;">问题限时</el-col>
          <el-col :span="8">
            <el-input
              :disabled="true"
              v-model="contentDetails.expireTime">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="details">
        问题描述
        <el-input
          type="textarea"
          :disabled="true"
          v-model="contentDetails.questionDetail">
        </el-input>
      </div>
      <div class="details">
        <el-row>
          <el-col :span="24">
            <img v-for="(item, index) in contentDetails.questionImagesList" :key="index" :src="item.url" style="max-height: 300px; margin-right: 10px;"/>
          </el-col>
        </el-row>
      </div>
      <div class="details">
        问题答案
        <el-input
          type="textarea"
          :disabled="true"
          v-model="contentDetails.content">
        </el-input>
      </div>
      <div class="details">
        <el-row>
          <el-col :span="24">
            <img v-for="(item, index) in contentDetails.answerImagesList" :key="index" :src="item.url" style="max-height: 300px; margin-right: 10px;"/>
          </el-col>
        </el-row>
      </div>
      <div class="details">
        <el-row>
          <el-col :span="8"></el-col>
          <el-col :span="3" style="width: 100px;">回答者昵称</el-col>
          <el-col :span="3" style="margin-right: 20px;">
            <el-input
              :disabled="true"
              v-model="contentDetails.answerName">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 80px;">查看次数</el-col>
          <el-col :span="3" style="margin-right: 20px;">
            <el-input
              :disabled="true"
              v-model="contentDetails.readCount">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 80px;">采纳率</el-col>
          <el-col :span="3">
            <el-input
              :disabled="true"
              v-model="contentDetails.acceptPercent">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialogFooter">
        <el-button type="primary" @click="dialogVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components';
  import { getMsg, deleteMsg, postMsg } from "../../api/api";

  export default{
    data(){
      return {
        input: '',
        adoptionRates: [{
          value: '',
          label: '全部'
        }, {
          value: '80',
          label: '80%以上'
        }, {
          value: '60-79',
          label: '60-79%'
        }, {
          value: '40-59',
          label: '40-59%'
        }, {
          value: '40',
          label: '40%以下'
        }],
        adoptionRate: '',
        problemStatus: [{
          value: '',
          label: '全部'
        }, {
          value: 1,
          label: '发布'
        }, {
          value: 2,
          label: '已回答'
        }, {
          value: 3,
          label: '拒绝'
        }, {
          value: 4,
          label: '过期'
        }],
        problemState: '',
        messageTotal: 288,
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
        pageSize: 5,
        pageTotal: 0,
        searchInput: '',
        ids: [],
        dialogVisible: false,
        contentDetails: {
          acceptPercent: 0,
          answerAudiosList: null,
          answerId: 0,
          answerImagesList: null,
          content: null,
          creatorAvatar: null,
          creatorName: null,
          creatorSkilledCourse: null,
          creatorSpecialtyName: null,
          detail: null,
          questionAudiosList: [],
          questionId: 0,
          questionImagesList: [],
          readCount: 0,
          targetAvatar: null,
          targetName: null,
          targetSkilledCourse: null,
          targetSpecialtyName: null,
          title: null
        }
      }
    },
    components: {
      panelTitle
    },
    mounted() {
      let path = 'questionMgr/list';
      let params = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1);
      this.getCurrencyMsg(path, params);
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      delMsg() {
        this.multipleSelection.forEach((item) => {
          this.ids.push(item.questionId);
        });
        this.ids = Array.from(new Set(this.ids));
        deleteMsg('questionMgr/delete', 'ids=' + this.ids).then((res) => {
          if (res.data.code === 0) {
            this.publicGetMsg();
          }
        }).catch(error=>{
          console.log(error);
        });
      },
      getCurrencyMsg(path, params) {
        getMsg(path, params).then(response => {
          this.tableData = response.data.data.list;
          this.pageTotal = response.data.data.totalCount;
        }).catch(error=>{
          console.log(error);
        });
      },
      formatStatus(row, column, cellValue, index) {
        return row.status == 1 ? '发布' : row.status == 2 ? '已回答' : row.status == 3 ? '拒绝' : row.status == 4 ? '过期' : '-';
      },
      searchKey() {
        this.searchInput = this.input;
        this.publicGetMsg();
      },
      getRowKeys(row) {
        return row.id;
      },
      handleClick(msg) {
        this.dialogVisible = true;
        const that = this;
        getMsg('questionMgr/' + msg.questionId).then((res) => {
          that.contentDetails = res.data.data;
        })
      },
      publicGetMsg() {
        let path = 'questionMgr/list';
        let params1 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.searchInput + '&acceptPersent=' + this.adoptionRate + '&status=' + this.problemState;
        let params2 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&acceptPersent=' + this.adoptionRate + '&status=' + this.problemState;
        if (this.searchInput != null && this.searchInput !== '') {
          this.getCurrencyMsg(path, params1);
        } else {
          this.getCurrencyMsg(path, params2);
        }
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.publicGetMsg();
      }
    },
    watch: {
      adoptionRate(val) {
        let path = 'questionMgr/list';
        let params1 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.searchInput + '&acceptPersent=' + val + '&status=' + this.problemState;
        let params2 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&acceptPersent=' + val + '&status=' + this.problemState;
        if (this.searchInput != null && this.searchInput !== '') {
          this.getCurrencyMsg(path, params1);
        } else {
          this.getCurrencyMsg(path, params2);
        }
      },
      problemState(val) {
        let path = 'questionMgr/list';
        let params1 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.searchInput + '&status=' + val + '&acceptPersent=' + this.adoptionRate;
        let params2 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&status=' + val + '&acceptPersent=' + this.adoptionRate;
        if (this.searchInput != null && this.searchInput !== '') {
          this.getCurrencyMsg(path, params1);
        } else {
          this.getCurrencyMsg(path, params2);
        }
      }
    }
  }
</script>
<style scoped>
  .dialogFooter {
    text-align: center;
  }
  .details {
    line-height: 40px;
    padding: 5px 0;
  }
  .firstDetails {
    border-top: 1px dashed #bbb;
    padding: 10px 0;
  }
</style>

