// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import VueWechatTtitle from 'vue-wechat-title'
// 跨域请求
import axios from 'axios'
// 状态管理
import Vuex from 'vuex'
import store from '@/store/store'
// 不同路径的标题控制
Vue.use(VueWechatTtitle)
// element-ui
Vue.use(ElementUi)
Vue.use(Vuex)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://localhost:5000/api/'
axios.defaults.withCredentials = false
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 每次执行路由前的验证
router.beforeEach((to, from, next) => {
  // console.log('title change: ' + document.title)
  // 不访问layout路径
  if (to.path === '/main' || to.path === '/') {
    // next(false)
    next('/main/MonitorProgram')
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
