/*
 * @Author: your name
 * @Date: 2021-08-28 16:41:04
 * @LastEditTime: 2022-03-05 20:34:13
 * @LastEditors: tushan
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/router/index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
import { memory } from 'jsb-util'

Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '????????????', icon: 'el-icon-data-line' }
      }
    ]
  },
  {
    path: '/userlist',
    component: Layout,
    redirect: '/userlist/table',
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '????????????', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/index',
    meta: { title: '????????????', icon: 'el-icon-tickets' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/article/index'),
        meta: { title: '????????????', icon: 'el-icon-document-checked' }
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/report',
    meta: { title: '????????????', icon: 'el-icon-receiving' },
    children: [
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/activityManage/report'),
        meta: { title: '????????????', icon: 'el-icon-camera' }
      },
      {
        path: 'sendNews',
        name: 'SendNews',
        component: () => import('@/views/activityManage/sendNews'),
        meta: { title: '????????????', icon: 'el-icon-news' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    meta: { title: '????????????', icon: 'el-icon-receiving', per: 1 },
    children: [
      {
        path: 'index',
        name: 'aIndex',
        component: () => import('@/views/admin/index'),
        meta: { title: '???????????????', icon: 'el-icon-collection-tag', per: 1 }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '',
    meta: { title: '????????????', icon: 'el-icon-setting' },
    children: [
      {
        path: 'settings',
        name: 'Friendlink',
        component: () => import('@/views/settings/index'),
        meta: { title: '????????????', icon: 'el-icon-setting', per: 1 }
      },
      {
        path: 'friendlink',
        name: 'Friendlink',
        component: () => import('@/views/dashboard/friendlink'),
        meta: { title: '????????????', icon: 'el-icon-setting' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()
router.beforeEach((to, form, next) => {
  const { meta = {} } = to
  const { per = false } = meta
  if (per) {
    if (per == memory.get('per')) {
      next()
    } else {
      next('/401')
    }
  } else {
    next()
  }

})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
