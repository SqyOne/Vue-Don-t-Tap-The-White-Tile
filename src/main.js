// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import game from './components/game/game'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {path: '/', component: App},
  {path: '/game', component: game}
]
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
