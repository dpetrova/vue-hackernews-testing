import { shallowMount } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  test('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar)
    //testing classes (e.g. when you add a class dynamically)
    expect(wrapper.classes()).toContain('hidden')
  })

  test('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar)
    //testing style (e.g. when you add an inline style dynamically)
    expect(wrapper.element.style.width).toBe('0%')
  })
})
