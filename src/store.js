import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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

function deleteCookie (cname) {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

const store = new Vuex.Store({
  state: {
    userID: null,
    userName: null,
    token: null
  },
  getters: {
    bearerToken: state => {
      if (state.token) {
        return `Bearer ${state.token}`
      }
      return null
    }
  },
  mutations: {
    setToken: function (state, payload) {
      state.token = payload.token
    },
    setUserName: function (state, payload) {
      state.userName = payload.userName
    },
    setUserID: function (state, payload) {
      state.userID = payload.userID
    }
  },
  actions: {
    getAuthData: function (context) {
      context.commit('setToken', { token: getCookie('auth') })
      context.commit('setUserID', { userID: getCookie('fbid') })
      context.commit('setUserName', { userName: getCookie('fbname') })
    },
    logout: function (context) {
      deleteCookie('auth')
      deleteCookie('fbid')
      deleteCookie('fbname')
      context.commit('setToken', { token: null })
      context.commit('setUserID', { userID: null })
      context.commit('setUserName', { userName: null })
    }
  }
})

export default store
