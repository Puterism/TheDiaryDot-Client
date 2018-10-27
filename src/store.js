import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

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
      context.dispatch('getUserInfo')
    }
  }
})

export default store
