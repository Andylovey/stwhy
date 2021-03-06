import Vue from 'vue'
import Element from 'element-ui'
import scroll from 'vue-seamless-scroll'
import Icon from 'vue-svg-icon/Icon.vue'
import '@/theme/element-#41B883/index.css'
import '@/assets/styl/index'
//import '@/mock'
import '@/assets/icon/iconfont.css'

// import '../public/ueditor/ueditor.config'
// import '../public/ueditor/ueditor.all'
// import '../public/ueditor/lang/zh-cn/zh-cn'
// import '../public/ueditor/ueditor.parse'

import App from '@/App'
import { router } from '@/router'
import '@/router/routerControl'
import store from '@/store'

import i18n from '@/lang'

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.component('icon', Icon)

import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
Vue.use(Croppa)

// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
// Vue.use(iView)
//import uploader from 'vue-simple-uploader'
import uploader from './components/simpleuploader/index.js'
Vue.use(uploader)

Vue.use(scroll)
Vue.use(Element, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
