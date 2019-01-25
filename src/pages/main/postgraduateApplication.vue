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
          <el-col :span="1" style="width: 50px;">学历</el-col>
          <el-col :span="4">
            <el-select v-model="education" size="small">
              <el-option v-for="item in educations" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width: 80px;">入学时间</el-col>
          <el-col :span="4">
            <el-select v-model="admissionTime" size="small">
              <el-option v-for="item in admissionTimes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" style="width: 80px;">申请状态</el-col>
          <el-col :span="4">
            <el-select v-model="application" size="small">
              <el-option v-for="item in applications" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
            label="微信名称"
            show-overflow-tooltip
            align="center">
            <template slot-scope="scope">{{ scope.row.nickname }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="collegeName"
            label="学校信息"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="院系信息"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="specialtyName"
            label="专业信息"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="申请状态"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="primary" size="small">详情</el-button>
              <el-select v-model="apply" size="small" style="width: 85px">
                <el-option v-for="item in applys" :key="item" :label="item" :value="item"></el-option>
              </el-select>
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
    <el-dialog title="申请详情" :visible.sync="dialogVisible">
      <div class="details firstDetails">
        <el-row>
          <el-col :span="2" style="width: 80px;">用户昵称</el-col>
          <el-col :span="8" style="margin-right: 20px;">
            <el-input
              :disabled="true"
              v-model="applicationDetails.name">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 80px;">学历信息</el-col>
          <el-col :span="8">
            <el-input
              :disabled="true"
              v-model="applicationDetails.eduLevel">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="details">
        <el-row>
          <el-col :span="2" style="width: 80px;">学校信息</el-col>
          <el-col :span="8" style="margin-right: 20px;">
            <el-input
              :disabled="true"
              v-model="applicationDetails.collegeName">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 80px;">院系信息</el-col>
          <el-col :span="8">
            <el-input
              :disabled="true"
              v-model="applicationDetails.departmentName">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="details">
        <el-row>
          <el-col :span="2" style="width: 80px;">专业信息</el-col>
          <el-col :span="8" style="margin-right: 20px;">
            <el-input
              :disabled="true"
              v-model="applicationDetails.specialtyName">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 80px;">入学时间</el-col>
          <el-col :span="8">
            <el-input
              :disabled="true"
              v-model="applicationDetails.collegeEnterTime">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="details">
        上传的照片
        <el-row>
          <el-col :span="12" style="height: 50px; background: blue;"></el-col>
          <el-col :span="12" style="height: 50px; background: blue;"></el-col>
        </el-row>
      </div>
      <div class="details">
        <el-row>
          <el-col :span="3" style="width: 100px;">问题酬劳（元）</el-col>
          <el-col :span="7" style="margin-right: 20px;">
            <el-input
              :disabled="true"
              v-model="applicationDetails.questionPrice">
            </el-input>
          </el-col>
          <el-col :span="2" style="width: 80px;">真实姓名</el-col>
          <el-col :span="8">
            <el-input
              :disabled="true"
              v-model="applicationDetails.realName">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="details">
        <el-row>
          <el-col :span="2" style="width: 80px;">联系电话</el-col>
          <el-col :span="8">
            <el-input
              :disabled="true"
              v-model="applicationDetails.mobile">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="details">
        自我简介
        <el-input
          type="textarea"
          :disabled="true"
          v-model="applicationDetails.summary">
        </el-input>
      </div>
      <div slot="footer" class="dialogFooter">
        <el-button type="primary" @click="dialogVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  import { getMsg, deleteMsg } from "../../api/api";
  const statusType = {
    '待审核': 0,
    '审核通过': 1,
    '审核拒绝': 2
  }
  const eduLevelType = {
    '研究生': 1,
    '博士': 2
  }
  export default{
    data(){
      return {
        input: '',
        educations: [{
          value: -1,
          label: '全部'
        }, {
          value: 1,
          label: '研究生'
        }, {
          value: 2,
          label: '博士生'
        }],
        education: -1,
        admissionTimes: [{
          value: -1,
          label: '全部'
        }, {
          value: '2018',
          label: '2018年'
        }, {
          value: '2017',
          label: '2017年'
        }, {
          value: '2016',
          label: '2016年'
        }],
        admissionTime: -1,
        applications: [{
          value: -1,
          label: '全部'
        }, {
          value: 0,
          label: '待审核'
        }, {
          value: 1,
          label: '审核通过'
        }, {
          value: 2,
          label: '审核拒绝'
        }],
        application: -1,
        tableData: [],
        multipleSelection: [],
        applys: ['待审核', '审核通过', '审核拒绝'],
        apply: '待审核',
        currentPage: 1,
        pageSize: 5,
        pageTotal: 0,
        ids: [],
        dialogVisible: false,
        formLabelWidth: '600px',
        applicationDetails: {
          collegeEnterTime: null,
          collegeName: null,
          departmentName: null,
          eduLevel: null,
          id: 0,
          idcardImage: null,
          mobile: null,
          name: '',
          questionPrice: null,
          realName: null,
          specialtyName: null,
          summary: null,
        },
        searchInput: ''
      }
    },
    computed: {
      httpError() {
        return this.$store.state.httpError;
      }
    }, 
    components: {
      panelTitle
    },
    mounted() {
      let path = 'postgraduate/apply/list';
      let params = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1);
      this.getCurrencyMsg(path, params);
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
        val.forEach((item) => {
          this.ids.push(item.id);
        });
        this.ids = Array.from(new Set(this.ids));
      },
      delMsg() {
        deleteMsg('postgraduate/apply/delete', 'ids=' + this.ids).then((res) => {
          if (res.data.code === 0) {
            window.location.reload();
          }
        }).catch(error=>{
          console.log(error);
        });
      },
      getRowKeys(row) {
        return row.id;
      },
      handleClick(msg) {
        this.dialogVisible = true;
        const that = this;
        getMsg('postgraduate/apply/' + msg.id).then((res) => {
          that.applicationDetails = res.data.data;
          if (that.applicationDetails) {
            that.applicationDetails.forEach((item) => {
            if (item.eduLevel === eduLevelType.研究生) {
              item.eduLevel = '研究生';
            } else if (item.eduLevel === eduLevelType.博士) {
              item.eduLevel = '博士';
            } else {
              item.eduLevel = '-'
            }
          })
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        let path = 'postgraduate/apply/list';
        let params1 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.searchInput;
        let params2 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1);
        if (this.searchInput != null && this.searchInput !== '') {
          this.getCurrencyMsg(path, params1);
        } else {
          this.getCurrencyMsg(path, params2);
        }
      },
      getCurrencyMsg(path, params) {
        getMsg(path, params).then(response => {
          this.tableData = response.data.data.list;
          this.pageTotal = response.data.data.totalCount;
          this.tableData.forEach((item) => {
            if (item.status === statusType.待审核) {
              item.status = '待审核';
            } else if (item.status === statusType.审核通过) {
              item.status = '审核通过';
            } else if (item.status === statusType.审核拒绝) {
              item.status = '审核拒绝';
            } else {
              item.status = '-';
            }
          });
        }).catch(error=>{
          console.log(error);
        });
      },
      searchKey() {
        this.searchInput = this.input;
        let path = 'postgraduate/apply/list';
        let params1 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.input;
        let params2 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1);
        if (this.input != null && this.input !== '') {
          this.getCurrencyMsg(path, params1);
        } else {
          this.getCurrencyMsg(path, params2);
        }
      }
    },
    watch: {
      education(val) {
        console.log('****test111', val, this.searchInput, this.searchInput != null);
        let path = 'postgraduate/apply/list';
        let params1 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.searchInput + '&eduLevel=' + val;
        let params2 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&eduLevel=' + val;
        let params3 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.searchInput;
        let params4 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1);
        if (val !== -1) {
          if (this.searchInput != null && this.searchInput !== '') {
            this.getCurrencyMsg(path, params1);
          } else {
            this.getCurrencyMsg(path, params2);
          }
        } else {
          if (this.searchInput != null && this.searchInput !== '') {
            this.getCurrencyMsg(path, params3);
          } else {
            this.getCurrencyMsg(path, params4);
          }
        }
      },
      admissionTime(val) {
        let path = 'postgraduate/apply/list';
        let params1 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.searchInput + '&collegeEnterTime=' + val;
        let params2 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&collegeEnterTime=' + val;
        let params3 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.searchInput;
        let params4 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1);
        if (val !== -1) {
          if (this.searchInput != null && this.searchInput !== '') {
            this.getCurrencyMsg(path, params1);
          } else {
            this.getCurrencyMsg(path, params2);
          }
        } else {
          if (this.searchInput != null && this.searchInput !== '') {
            this.getCurrencyMsg(path, params3);
          } else {
            this.getCurrencyMsg(path, params4);
          }
        }
      },
      application(val) {
        let path = 'postgraduate/apply/list';
        let params1 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.searchInput + '&status=' + val;
        let params2 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&status=' + val;
        let params3 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1) + '&term=' + this.searchInput;
        let params4 = 'pageSize=' + this.pageSize + '&pageNum=' + (this.currentPage-1);
        if (val !== -1) {
          if (this.searchInput != null && this.searchInput !== '') {
            this.getCurrencyMsg(path, params1);
          } else {
            this.getCurrencyMsg(path, params2);
          }
        } else {
          if (this.searchInput != null && this.searchInput !== '') {
            this.getCurrencyMsg(path, params3);
          } else {
            this.getCurrencyMsg(path, params4);
          }
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


