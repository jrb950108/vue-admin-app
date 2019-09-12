import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './locale'
// a modern alternative to CSS resets
import 'normalize.css/normalize.css'
import './element-ui.js'
import './styles/element-variables.scss'
import './styles/index.scss'
import Musd from './components'

if (process.env.NODE_ENV === 'development') {
  require('./mock')
}

Vue.config.productionTip = false

Vue.use(Musd)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
