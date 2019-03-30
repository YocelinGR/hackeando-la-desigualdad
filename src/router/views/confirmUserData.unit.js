import ConfirmaDatos from './confirmUserData'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import { RouterLinkStub } from '@vue/test-utils'
import { fireEvent } from 'dom-testing-library'
import { render } from 'vue-testing-library'

const flushPromises = require("flush-promises")

Vue.use(Vuetify, VueRouter)

describe('@views/confirmUserDAta', () => {
  const $route = {
      path: '/confirmation',
      params: {
        validUser: {
          validEmail: "johndoe@mail.com",
          validPassword: "johndoe",
          validPhone: '5555462293',
        }
      }
    }
    const wrapper = shallowMount(ConfirmaDatos, {
      mocks: {
        $route
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

  it('is a valid View', () => {
    expect(ConfirmaDatos).toBeAViewComponent()
  })

  it('renders a ConfirmaDatos component and renders the correct path', () => {
    expect(wrapper.find(ConfirmaDatos).exists()).toBe(true)
    // Testing the view´s path
    expect(wrapper.vm.$route.path).toBe('/confirmation')
  })

  it('it renders the valid user´s data', () => {
    // Valid user Email
    expect(wrapper.html()).toContain(wrapper.vm.$route.params.validUser.validEmail)
    // Valid user Password
    expect(wrapper.html()).toContain(wrapper.vm.$route.params.validUser.validPassword)
    // Valid user Phone
    expect(wrapper.html()).toContain(wrapper.vm.$route.params.validUser.validPhone)
  })
  it('Component change view when click to confirm data', async done => {
    const { queryByTestId } = render(ConfirmaDatos, {
      mocks: {
        $route
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    fireEvent.click(queryByTestId('confirmData'))

    await flushPromises()

    // Not exist user data when confirm User Data button has been clicked
    expect(queryByTestId('confirmDataForm').outerHTML).not.toContain(wrapper.vm.$route.params.validUser.validEmail)

    done()
  })
})
