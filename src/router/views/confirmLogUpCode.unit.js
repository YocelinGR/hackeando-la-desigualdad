import ConfirmaCodigo from './confirmLogUpCode'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import { RouterLinkStub } from '@vue/test-utils'
import { fireEvent } from 'dom-testing-library'
import { render } from 'vue-testing-library'

const flushPromises = require('flush-promises')

Vue.use(Vuetify, VueRouter)

describe('@views/confirmLogUpCode', () => {
  it('is a valid views', () => {
    expect(ConfirmaCodigo).toBeAViewComponent()
  })
  it("does render a 'ConfirmaCodigo' component", () => {
    const wrapper = shallowMount(ConfirmaCodigo)
    expect(wrapper.find(ConfirmaCodigo).exists()).toBe(true)
  })

  it('mocking the route /confirmation/code', () => {
    const $route = {
      path: '/confirmation/code'
    }
    const wrapper = shallowMountView(ConfirmaCodigo, {
      mocks: {
        $route
      },
      stubs: {
         RouterLink: RouterLinkStub
     }
    })

    expect(wrapper.vm.$route.path).toBe('/confirmation/code')
  })

  it('Testing createAccount() method when no code is given', async done => {

    const { queryByTestId } = render(ConfirmaCodigo, {
      data() {
        return { confirmCode: "" }
      }
    })
    fireEvent.click(queryByTestId('generateCode'))

    await flushPromises();

    // Error zone is rendered with missing code error
    expect(queryByTestId('errors').outerHTML).toContain('El código es requerido.')

    done()
  })

  it('Testing createAccount() method when wrong size of code is given (always available with 4 characters)', async done => {

    const { queryByTestId } = render(ConfirmaCodigo, {
      data() {
        return { confirmCode: "12345" }
      }
    })
    fireEvent.click(queryByTestId('generateCode'))

    await flushPromises();

    // Error zone is rendered with incorrect size code error
    expect(queryByTestId('errors').outerHTML).toContain('El código debe tener 4 dígitos.')

    done()
  })

  it('Testing createAccount() method when wrong code is given (by default code is: 3457)', async done => {

    const { queryByTestId } = render(ConfirmaCodigo, {
      data() {
        return { confirmCode: "3456" }
      }
    })
    fireEvent.click(queryByTestId('generateCode'))

    await flushPromises();

    // Error zone is rendered with wrong code given
    expect(queryByTestId('errors').outerHTML).toContain('Código invalido.')

    done()
  })

  it('Testing createAccount() method when corect code is given', async done => {

    const { queryByTestId } = render(ConfirmaCodigo, {
      data() {
        return { confirmCode: "3457" }
      }
    })
    fireEvent.click(queryByTestId('generateCode'))

    await flushPromises();

    // No error zone is rendered
    expect(queryByTestId('errors')).toBeNull()

    done()
  })

  it('Testing createAccount() method when change code', async done => {

    let wrapper = render(ConfirmaCodigo, {
      data() {
        return { confirmCode: "3457" }
      }
    })
    // Cahnge code event
    fireEvent.click(wrapper.queryByTestId('changeCode'))
    await flushPromises();

    // Send code event
    fireEvent.click(wrapper.queryByTestId('generateCode'))
    await flushPromises();

    // Error zone is rendered with no code given because has been changed
    expect(wrapper.queryByTestId('errors').outerHTML).toContain('El código es requerido.')

    done()
  })

})
