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
            <el-button type="primary" size="small" class="searchBtn">搜索</el-button>
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
          <el-col :span="15" style="min-width: 150px;">（共{{messageTotal}}条消息）</el-col>
          <el-col :span="9" align="right">
            <el-button size="small">删除</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="tableTotal">
        <el-table
          ref="multipleTable"
          :data="trueData"
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
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column
            prop="askingTitle"
            label="询问标题"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="problemSpecialty"
            label="问题专业"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="problemSubjects"
            label="问题科目"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="problemStat"
            label="问题状态"
            show-overflow-tooltip
            align="center">
          </el-table-column>
          <el-table-column
            prop="adoption"
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
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        input: '',
        adoptionRates: [{
          value: '选项1',
          label: '80%以上'
        }, {
          value: '选项2',
          label: '60-79%'
        }, {
          value: '选项3',
          label: '40-59%'
        }, {
          value: '选项4',
          label: '40%以下'
        }],
        adoptionRate: '选项1',
        problemStatus: [{
          value: '选项111',
          label: '全部'
        }, {
          value: '选项222',
          label: '等待回答'
        }, {
          value: '选项333',
          label: '已回答'
        }, {
          value: '选项444',
          label: '已拒绝'
        }],
        problemState: '选项111',
        messageTotal: 288,
        tableData: [{
          id: 1,
          weChatName: 'wangxiao1',
          askingTitle: '王小1',
          problemSpecialty: '南航1',
          problemSubjects: '计算机1',
          problemStat: '网络工程1',
          adoption: '申请中'
        }, {
          id: 2,
          weChatName: 'wangxiao2',
          askingTitle: '王小2',
          problemSpecialty: '南航2',
          problemSubjects: '计算机2',
          problemStat: '网络工程2',
          adoption: '待审核'
        }, {
          id: 3,
          weChatName: 'wangxiao3',
          askingTitle: '王小3',
          problemSpecialty: '南航3',
          problemSubjects: '计算机3',
          problemStat: '网络工程3',
          adoption: '已拒绝'
        }, {
          id: 4,
          weChatName: 'wangxiao4',
          askingTitle: '王小4',
          problemSpecialty: '南航4',
          problemSubjects: '计算机4',
          problemStat: '网络工程4',
          adoption: '已通过'
        }, {
          id: 5,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 6,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 7,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 8,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 9,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 10,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 11,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 12,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 13,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 14,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 15,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 16,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 17,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 18,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 19,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 20,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 21,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 22,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 23,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 24,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 25,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 26,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 27,
          weChatName: 'wangxiao5',
          askingTitle: '王小5',
          problemSpecialty: '南航5',
          problemSubjects: '计算机5',
          problemStat: '网络工程5',
          adoption: '已通过'
        }, {
          id: 28,
          weChatName: 'wangxiao6',
          askingTitle: '王小6',
          problemSpecialty: '南航6',
          problemSubjects: '计算机6',
          problemStat: '网络工程6',
          adoption: '已通过'
        }, {
          id: 29,
          weChatName: 'wangxiao7',
          askingTitle: '王小7',
          problemSpecialty: '南航7',
          problemSubjects: '计算机7',
          problemStat: '网络工程7',
          adoption: '已拒绝'
        }],
        multipleSelection: [],
        currentPage: 1,
        pageSize: 5,
        pageTotal: 10,
        trueData: []
      }
    },
    components: {
      panelTitle
    },
    mounted() {
      this.pageTotal = this.tableData.length;
      this.trueData = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getRowKeys(row) {
        return row.id;
      },
      handleClick(msg) {
        console.log('**********msg', msg);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.trueData = this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
      }
    }
  }
</script>

