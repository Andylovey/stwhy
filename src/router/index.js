import Vue from 'vue'
import VueRouter from 'vue-router'
import _import from '@/utils/import'
const Layout = _import('layout/Layout')

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/401',
    component: _import('errorPage/401'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('errorPage/404'),
    hidden: true
  },
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/lock',
    component: _import('lock/index'),
    name: 'lock',
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: _import('dashboard/index'),
        meta: {
          title: 'dashboard',
          noCache: true
        }
      }
    ]
  }
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'seminar/symposium/58',
  //   children: [
  //     {
  //       path: 'seminar/symposium/58',
  //       name: 'symposium',
  //       component: _import('seminar/symposium'),
  //       meta: {
  //         title: 'symposium',
  //         icon: 'dashboard',
  //         id: 58,
  //         noCache: true
  //       }
  //     }
  //   ]
  // }
]

export const router = new VueRouter({
  routes: constantRouterMap,
  scrollBehavior: () => ({ y: 0 })
})
