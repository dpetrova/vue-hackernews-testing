import Form from '../Form.vue'
import { shallowMount } from '@vue/test-utils'

describe('Form.vue', () => {
  //testing components that emit Vue custom events
  test('emits form-submitted when form is submmited', () => {
    // const wrapper = shallowMount(Form, {
    //   mocks: { axios: { post: jest.fn() } }
    // })
    const wrapper = shallowMount(Form)
    //dispatche a submit event on a button element
    wrapper.find('button').trigger('submit')
    //assert that the form-submitted custom event was emitted
    expect(wrapper.emitted('form-submitted')).toHaveLength(1)
  })

  //   test('sends post request with email on submit', () => {
  //     const axios = {
  //       post: jest.fn()
  //     }
  //     const wrapper = shallowMount(Form, {
  //       mocks: {
  //         axios
  //       }
  //     })
  //     const input = wrapper.find('input[type="email"]')
  //     input.setValue('email@gmail.com')
  //     wrapper.find('button').trigger('submit')
  //     const url = 'http://demo7437963.mockable.io/validate'
  //     const expectedData = expect.objectContaining({
  //       email: 'email@gmail.com'
  //     })
  //     expect(axios.post).toHaveBeenCalledWith(url, expectedData)
  //   })

  //   test('sends post request with default enterCompetition checkbox value on submit', () => {
  //     const axios = {
  //       post: jest.fn()
  //     }
  //     const wrapper = shallowMount(Form, {
  //       mocks: {
  //         axios
  //       }
  //     })
  //     const url = 'http://demo7437963.mockable.io/validate'
  //     wrapper.find('button').trigger('submit')
  //     expect(axios.post).toHaveBeenCalledWith(
  //       url,
  //       expect.objectContaining({
  //         enterCompetition: true
  //       })
  //     )
  //   })

  //   test('sends post request with enterCompetition checkbox value on submit', () => {
  //     const axios = {
  //       post: jest.fn()
  //     }
  //     const wrapper = shallowMount(Form, {
  //       mocks: {
  //         axios
  //       }
  //     })
  //     const url = 'http://demo7437963.mockable.io/validate'

  //     wrapper.find('input[value="no"]').setChecked()
  //     wrapper.find('button').trigger('submit')

  //     expect(axios.post).toHaveBeenCalledWith(
  //       url,
  //       expect.objectContaining({
  //         enterCompetition: false
  //       })
  //     )
  //   })
})
