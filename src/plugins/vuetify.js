import Vue from 'vue'
import 'vuetify/src/stylus/app.styl'
import Vuetify from 'vuetify'
import {
  VNavigationDrawer,
  VToolbar,
  VContent,
  VContainer,
  VLayout,
  VFlex,
} from 'vuetify/lib'

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VNavigationDrawer,
    VToolbar,
    VContent,
    VContainer,
    VLayout,
    VFlex,
  },
})
