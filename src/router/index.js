import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import uDetail from '@/components/uDetail'
import indexSection from '@/components/index_section'
import gd from '@/components/gd'
import play from '@/components/mvPlay'
import play1 from '@/components/mv1'
import songer from '@/components/songer'
import album from '@/components/album'
import gdAll from '@/components/gd_all'
import search from '@/components/search'
import newMv from '@/components/newMv'
import phb from '@/components/phb'
import dt from '@/components/dt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: 'indexSection',
          component: indexSection
        },
        {
          path: 'newMv',
          component: newMv
        },
        {
          path: 'phb',
          component: phb
        }
      ]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/uDetail/:id',
      name: 'uDetail',
      component: uDetail
    },
    {
      path: '/gd/:id',
      name: 'gd',
      component: gd
    },
    {
      path: '/play/:id',
      name: 'play',
      component: play
    },
    {
      path: '/play1/:id',
      name: 'play1',
      component: play1
    },
    {
      path: '/songer/:id',
      name: 'songer',
      component: songer
    },
    {
      path: '/album/:id',
      name: 'album',
      component: album
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/gdAll',
      name: 'gdAll',
      component: gdAll
    },
    {
      path: '/dt/:id',
      name: 'dt',
      component: dt
    }
  ]
})
