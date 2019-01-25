<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <span>数据分析</span>
      </router-link>
      <el-menu
        class="menu-box"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            :index="item.path">
            <span v-text="item.title"></span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    name: 'slide',
    data(){
      return {
        nav_menu_data: [{
          title: "概况",
          path: "/survey"
        }, {
          title: "实时分析",
          path: "/realTimeAnalysis"
        }, {
          title: "事件分析",
          path: "/eventAnalysis"
        }, {
          title: "用户分析",
          path: "/userAnalysis"
        }, {
          title: "用户行为分析",
          path: "/userBehaviorAnalysis"
        }, {
          title: "研究生申请",
          path: "/postgraduateApplication"
        }, {
          title: "内容管理",
          path: "/contentManagement"
        }]
      }
    }
  }
</script>
<style>
.el-menu-item * {
  vertical-align: top !important;
}
</style>

