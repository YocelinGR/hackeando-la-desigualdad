import CreaCuenta from './logUp'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import { RouterLinkStub } from '@vue/test-utils';
import {
  fireEvent,
} from "dom-testing-library";
import { render } from 'vue-testing-library'

const flushPromises = require("flush-promises");

Vue.use(Vuetify, VueRouter)

describe('@views/logUp', () => {
  it('is a valid view', () => {
    expect(CreaCuenta).toBeAViewComponent()
  })

  it("it renders a 'CreaCuenta' component", () => {
    const wrapper = shallowMount(CreaCuenta)
    expect(wrapper.find(CreaCuenta).exists()).toBe(true)
  })

  it('mocking the route /logup', () => {
    const $route = {
      path: '/logup'
    }
    const wrapper = shallowMountView(CreaCuenta, {
      mocks: {
        $route
      },
      stubs: {
         RouterLink: RouterLinkStub
     }
    })

    expect(wrapper.vm.$route.path).toBe('/logup')
  })
  it('Testing checkForm method when no auth data is given', async done => {

    const { queryByTestId } = render(CreaCuenta)
    expect(queryByTestId('test1').outerHTML).toContain('CREAR CUENTA')
    fireEvent.click(queryByTestId('test1'))

    await flushPromises();

    // Error zone is rendered
    expect(queryByTestId('errors').outerHTML).toContain('Ops!, parece que algo no anda bien:')
    // Email and passwor required error messages are rendered
    expect(queryByTestId('errors').outerHTML).toContain('El correo es requerido.')
    expect(queryByTestId('errors').outerHTML).toContain('Contraseña requerida.')
    // Other errors cases are not rendered
    expect(queryByTestId('errors').outerHTML).not.toContain('Correo no valido.')

    done()
  })

  it('Testing checkForm method when incorrect email is given', async done => {
    const { queryByTestId } = render(CreaCuenta, {
      data() {
        return {
          userEmail: "johny@mail.com",
          userPassword: "johndoe",
        }
      }
    })
    fireEvent.click(queryByTestId('test1'))

    await flushPromises();

    expect(queryByTestId('errors').outerHTML).toContain('Correo no valido.')
    done()
  })

  it('Testing checkForm method when the email has not correct pattern', async done => {
    const { queryByTestId } = render(CreaCuenta, {
      data() {
        return {
          userEmail: "johnymail.com",
          userPassword: "johndoe",
        }
      }
    })
    fireEvent.click(queryByTestId('test1'))

    await flushPromises();

    expect(queryByTestId('errors').outerHTML).toContain('parece no ser un correo.')
    done()
  })

  it('Testing checkForm method when the password is not correct', async done => {
    const { queryByTestId } = render(CreaCuenta, {
      data() {
        return {
          userEmail: "johndoe@mail.com",
          userPassword: "incorrect",
        }
      }
    })
    fireEvent.click(queryByTestId('test1'))

    await flushPromises();

    expect(queryByTestId('errors').outerHTML).toContain('Contraseña no valida.')
    done()
  })

  it('No errors when auth is correct', async done => {
    const { queryByTestId } = render(CreaCuenta, {
      data() {
        return {
          userEmail: "johndoe@mail.com",
          userPassword: "johndoe",
        }
      }
    })
    fireEvent.click(queryByTestId('test1'))

    await flushPromises();
    expect(queryByTestId('errors')).toBeNull()

    done()
  })

  it('Testing security level message to be "Débil" (less than 8 characters)', async done => {
    const { queryByTestId } = render(CreaCuenta, {
      data() {
        return {
          userPassword: "johndoe",
        }
      }
    })
    await flushPromises();

    expect(queryByTestId('securityLevel').outerHTML).toContain('Débil')
    done()
  })

  it('Testing security level message to be "Segura" (more than 8 characters and less than 16)', async done => {
    const { queryByTestId } = render(CreaCuenta, {
      data() {
        return {
          userPassword: "myPasswordIs",
        }
      }
    })
    await flushPromises();

    expect(queryByTestId('securityLevel').outerHTML).toContain('Segura')
    done()
  })

  it('Testing security level message to be "Fuerte" (more than 16 characters)', async done => {
    const { queryByTestId } = render(CreaCuenta, {
      data() {
        return {
          userPassword: "myPasswordIsThisOne",
        }
      }
    })
    await flushPromises();

    expect(queryByTestId('securityLevel').outerHTML).toContain('Fuerte')
    done()
  })

})
