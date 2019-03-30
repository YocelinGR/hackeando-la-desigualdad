import Vue from 'vue'
import Vuetify from 'vuetify'
import { Ripple } from 'vuetify/lib/directives'
import './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './app'
import router from '@router'
import store from '@state/store'
import '@components/_globals'
import { createProvider } from './vue-apollo'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (window.Cypress) {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

Vue.use(Vuetify, {
  directives: {
    Ripple,
  },
  iconfont: 'md',
})

const app = new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app')

// If running inside Cypress...
if (window.Cypress) {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
