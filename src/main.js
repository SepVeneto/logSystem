import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from'axios'
import Global from './components/tool/Global.vue'
import './plugins/element.js'


Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.config.devtools = true;
Vue.prototype.GLOBAL = Global;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
