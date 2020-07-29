import SignUp from '../SignUp.vue'
import Modal from '../../components/Modal.vue'
import { shallowMount } from '@vue/test-utils'

describe('Signup.vue', () => {
  //test native DOM events
  test('emits onShowModal when button is clicked', () => {
    //Create a mock to pass to the modal component
    const onShowModal = jest.fn()
    //mount the component with an onShowModal prop
    const wrapper = shallowMount(SignUp, { propsData: { onShowModal } })
    //dispatche a DOM click event on a button element
    wrapper.find('button').trigger('click')
    //assert that the mock was called
    expect(onShowModal).toHaveBeenCalled()
  })

  //testing components that listen to Vue custom events
  test('hides Modal when Modal emits close-modal', async () => {
    const wrapper = shallowMount(SignUp)
    //emit a close-modal event from the Modal instance
    wrapper.findComponent(Modal).vm.$emit('close-modal')
    await wrapper.vm.$nextTick()
    //assert that the Modal isn’t rendered anymore using the toBeFalsy matcher
    expect(wrapper.findComponent(Modal).exists()).toBeFalsy()
  })
})
