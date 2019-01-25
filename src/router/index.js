import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//survey
import surveyComponent from 'pages/main/survey'
//realTimeAnalysis
import realTimeAnalysisComponent from 'pages/main/realTimeAnalysis'
//eventAnalysis
import eventAnalysisComponent from 'pages/main/eventAnalysis'
//userAnalysis
import userAnalysisComponent from 'pages/main/userAnalysis'
//userBehaviorAnalysis
import userBehaviorAnalysisComponent from 'pages/main/userBehaviorAnalysis'
//postgraduateApplication
import postgraduateApplicationComponent from 'pages/main/postgraduateApplication'
//contentManagement
import contentManagementComponent from 'pages/main/contentManagement'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'

Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  component: loginComponent
}, {
  path: '/',
  redirect: '/survey',
  component: viewPageComponent,
  children: [{
    path: '/survey',
    name: 'survey',
    component: surveyComponent,
    meta: {
      title: "数据概览",
      auth: true
    }
  }, {
    path: '/realTimeAnalysis',
    name: 'realTimeAnalysis',
    component: realTimeAnalysisComponent,
    meta: {
      title: "实时数据分析",
      auth: true
    }
  }, {
    path: '/eventAnalysis',
    name: 'eventAnalysis',
    component: eventAnalysisComponent,
    meta: {
      title: "事件分析",
      auth: true
    }
  }, {
    path: '/userAnalysis',
    name: 'userAnalysis',
    component: userAnalysisComponent,
    meta: {
      title: "用户分析",
      auth: true
    }
  }, {
    path: '/userBehaviorAnalysis',
    name: 'userBehaviorAnalysis',
    component: userBehaviorAnalysisComponent,
    meta: {
      title: "用户行为分析",
      auth: true
    }
  }, {
    path: '/postgraduateApplication',
    name: 'postgraduateApplication',
    component: postgraduateApplicationComponent,
    meta: {
      title: "申请的研究生",
      auth: true
    }
  }, {
    path: '/contentManagement',
    name: 'contentManagement',
    component: contentManagementComponent,
    meta: {
      title: "内容管理",
      auth: true
    }
  }]
}]

const router = new VueRouter({
  routes,
  mode: 'history', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
