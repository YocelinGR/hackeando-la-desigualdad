import LogInOptions from './loginOptions'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import { RouterLinkStub } from '@vue/test-utils'
import router from '../routes'
import sinon from 'sinon'

describe('@views/logUp', () => {
  Vue.use(Vuetify, VueRouter)
  it('is a valid view', () => {
    expect(LogInOptions).toBeAViewComponent()
  })

  it("it renders a 'CreaCuenta' component", () => {
    const wrapper = shallowMount(LogInOptions)
    expect(wrapper.find(LogInOptions).exists()).toBe(true)
  })

  it('mocking the route /logInOptions', () => {
    const $route = {
      path: '/logInOptions'
    }
    const wrapper = shallowMountView(LogInOptions, {
      mocks: {
        $route
      },
      stubs: {
         RouterLink: RouterLinkStub
     }
    })

    expect(wrapper.vm.$route.path).toBe('/logInOptions')
  })
})

describe('@views/logUp routes', () => {
  Vue.use(VueRouter)
  let sandbox
  beforeEach(() => {
        sandbox = sinon.sandbox.create()
        router
      })
    afterEach(() => {
      sandbox.restore()
    })

  it('should be in history mode', () => {
      sandbox.stub(LogInOptions, 'isAuthenticated').returns(false)
      expect(router.mode).to.eql('history')
  })
  it('should be able to navigate without authentication', () => {
        sandbox.stub(LogInOptions, 'isAuthenticated').returns(false)
        router.push('/logInOptions')
        expect(router.history.current.path).to.eql('/logInOptions')
        expect(router.getMatchedComponents('/logInOptions')[0].name).to.eql('loginOptions')
        router.push('/logup')
        expect(router.history.current.path).to.eql('/logup')
        expect(router.getMatchedComponents('/logup')[0].name).to.eql('logUp')
  })
})
