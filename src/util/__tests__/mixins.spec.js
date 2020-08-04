import { mount } from '@vue/test-utils'
import { titleMixin } from '../mixins'

describe('titleMixin', () => {
  test('set document.title using component title property', () => {
    //create a test component
    const Component = {
      render() {}, //empty render function to stop Vue errors
      title: 'dummy title', //title property
      mixins: [titleMixin] //mixin array to register
    }
    //mount component
    mount(Component)
    //assert that document.title has been updated to the correct value
    expect(document.title).toBe('Vue HN | dummy title')
  })

  test('does not set document.title if title property does not exist', () => {
    document.title = 'some title' //set document.title that will not be changed by mixin
    const Component = {
      render() {},
      mixins: [titleMixin]
    }
    mount(Component)
    expect(document.title).toBe('some title')
  })

  test('sets document.title using result of title if it is a function ', () => {
    const Component = {
      render() {},
      //create the titleValue property on the instance
      data() {
        return {
          titleValue: 'another dummy title'
        }
      },
      //title as a function
      title() {
        return this.titleValue
      },
      mixins: [titleMixin]
    }
    mount(Component)
    expect(document.title).toBe('Vue HN | another dummy title')
  })
})
