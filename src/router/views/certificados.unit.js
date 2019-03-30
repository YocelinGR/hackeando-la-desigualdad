import Certificados from './certificados'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('@views/certificados', () => {
  it('is a valid view', () => {
    expect(Certificados).toBeAViewComponent()
  })

  it('renders an element', () => {
    const { element } = shallowMountView(Certificados)
    expect(element.textContent).toBeTruthy()
  })
})
