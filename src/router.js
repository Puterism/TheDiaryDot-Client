import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function getCookie (cname) {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

const auth = () => (from, to, next) => {
  if (getCookie('auth') && getCookie('fbid')) {
    return next()
  }
  return next('/')
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/main',
      name: 'DiaryReaderContainer',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "DiaryReaderContainer" */ './views/DiaryReaderContainer.vue'),
      beforeEnter: auth()
    },
    {
      path: '/writer',
      name: 'DiaryWriterContainer',
      component: () => import(/* webpackChunkName: "DiaryWriterContainer" */ './views/DiaryWriterContainer.vue'),
      beforeEnter: auth()
    },
    {
      path: '/',
      name: 'DiaryIndexContainer',
      component: () => import(/* webpackChunkName: "DiaryIndexContainer" */ './views/DiaryIndexContainer.vue')
    }
    // {
    //   path: '*',
    //   redirect: '/'
    // }
  ]
})
