import MainLayout from './main'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

describe('@layouts/main', () => {
  it('renders its content', () => {
    const slotContent = '<p>Hello!</p>'
    const { element } = shallowMount(MainLayout, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toBeTruthy()
  })
})
