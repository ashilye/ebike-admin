import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题

import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})

