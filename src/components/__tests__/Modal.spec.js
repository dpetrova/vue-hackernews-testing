import Modal from '../Modal.vue'
import { shallowMount } from '@vue/test-utils'

describe('Modal.vue', () => {
  test('renders slot content', () => {
    const wrapper = shallowMount(Modal, {
      slots: {
        body: '<span />' //pass span to slot name="body"
      }
    })
    expect(wrapper.find('span').exists()).toBeTruthy()
  })

  //testing custom vue events
  test('emits on-close when button is clicked', () => {
    const wrapper = shallowMount(Modal)
    //dispatche a DOM click event on a button element
    wrapper.find('button').trigger('click')
    //assert that close-modal event was emitted once
    expect(wrapper.emitted('close-modal')).toHaveLength(1)
  })
})
