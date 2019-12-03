import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainLayout from '@/components/MainLayout'
import MonitorProgram from '@/components/MonitorProgram'
import AddProgram from '@/components/AddProgram'
import EventVisible from '@/components/EventVisible'
import SystemConfig from '@/components/SystemConfig'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/main',
      name: 'MainLayout',
      component: MainLayout,
      meta: {
        title: '舆情监测'
      },
      children: [
        {
          path: 'MonitorProgram',
          name: 'MonitorProgram',
          component: MonitorProgram,
          meta: {
            title: '监测方案'
          }
        },
        {
          path: 'AddProgram',
          name: 'AddProgram',
          component: AddProgram,
          meta: {
            title: '添加方案'
          }
        },
        {
          path: 'EventVisible',
          name: 'EventVisible',
          component: EventVisible,
          meta: {
            title: '事件可视化'
          }
        },
        {
          path: 'SystemConfig',
          name: 'SystemConfig',
          component: SystemConfig,
          meta: {
            title: '系统设置'
          }
        }
      ]
    }
  ]
})
