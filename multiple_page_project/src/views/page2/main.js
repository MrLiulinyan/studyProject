import Vue from 'vue'
import App from './index.vue'
console.log(222)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')