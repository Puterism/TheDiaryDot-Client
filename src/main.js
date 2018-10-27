import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './registerServiceWorker'
import VTooltip from 'v-tooltip'
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faBold, faItalic, faUnderline, faUserCircle, faCalendarAlt, faPenAlt, faEllipsisV,
  faTrashAlt, faEdit, faCaretUp, faCaretDown, faBan, faSignOutAlt, faExclamationTriangle,
  faUserSlash, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(VTooltip)

Vue.prototype.$http = axios

library.add(faBold)
library.add(faItalic)
library.add(faUnderline)
library.add(faUserCircle)
library.add(faCalendarAlt)
library.add(faPenAlt)
library.add(faEllipsisV)
library.add(faTrashAlt)
library.add(faEdit)
library.add(faCaretUp)
library.add(faCaretDown)
library.add(faFacebook)
library.add(faBan)
library.add(faSignOutAlt)
library.add(faExclamationTriangle)
library.add(faUserSlash)
library.add(faChevronDown)
library.add(faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
