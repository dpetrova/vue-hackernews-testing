import { mount } from '@vue/test-utils'
import { titleMixin, yearMixin } from '../mixins'

describe('titleMixin', () => {
  test('sets document.title using the title computed property', () => {
    const Component = {
      render() {},
      //create the titleValue property on the instance
      data() {
        return {
          titleValue: 'another dummy title'
        }
      },
      computed: {
        title() {
          return this.titleValue
        }
      },
      mixins: [titleMixin]
    }
    mount(Component)
    expect(document.title).toBe('Vue HN | another dummy title')
  })

  test('does not set document.title if title property does not exist', () => {
    document.title = 'some title' //set document.title that will not be changed by mixin
    const Component = {
      render() {},
      computed: {},
      mixins: [titleMixin]
    }
    mount(Component)
    expect(document.title).toBe('some title')
  })

  test('sets current year using the getCurrentYear computed property', () => {
    const year = new Date().getFullYear()
    const Component = {
      render() {},
      mixins: [yearMixin]
    }
    const wrapper = mount(Component)
    expect(wrapper.vm.$options.computed.getCurrentYear()).toBe(year)
  })
})
