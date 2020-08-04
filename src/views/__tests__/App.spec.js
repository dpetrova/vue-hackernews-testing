import App from '../../App.vue'
import { shallowMount } from '@vue/test-utils'

describe('App.vue', () => {
  test('sets document.title using locally registered mixin', async () => {
    shallowMount(App, {
      //make $route available as this.$route in App.vue to prevent Vue error
      mocks: {
        $route: {
          params: { type: 'top' } //set default type
        }
      },
      //stub router-link and router-view components to prevent Vue error
      stubs: ['router-link', 'router-view']
    })
    //assert that document.title was updated using the mixin
    expect(document.title).toBe('Vue HN | Top')
  })

  test('sets footer year using globally registered mixin', async () => {
    const year = new Date().getFullYear()
    const wrapper = shallowMount(App, {
      //make $route available as this.$route in App.vue to prevent Vue error
      mocks: {
        $route: {
          params: { type: 'top' }
        }
      },
      //stub router-link and router-view components to prevent Vue error
      stubs: ['router-link', 'router-view']
    })
    expect(wrapper.text()).toContain(year)
  })
})
