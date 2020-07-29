import Form from '../Form.vue'
import { shallowMount } from '@vue/test-utils'

describe('Form.vue', () => {
  //testing components that emit Vue custom events
  test('emits form-submitted when form is submmited', () => {
    //mount the form with mocked axios as an instance property (mock this.axios)
    const wrapper = shallowMount(Form, {
      mocks: { axios: { post: jest.fn() } }
    })
    //dispatche a submit event on a button element
    wrapper.find('button').trigger('submit')
    //assert that the form-submitted custom event was emitted
    expect(wrapper.emitted('form-submitted')).toHaveLength(1)
  })

  //testing a mock post request was called with a v-model bound input form value
  test('sends post request with email on submit', () => {
    //create a mocked axios object with a post property
    const axios = {
      post: jest.fn()
    }
    //mount the form with mocked axios as an instance property (mock this.axios)
    const wrapper = shallowMount(Form, {
      mocks: {
        axios
      }
    })
    //get email input
    const input = wrapper.find('input[type="email"]')
    //set the value of the input
    input.setValue('email@gmail.com')
    //submit the form
    wrapper.find('button').trigger('submit')
    const url = 'http://demo7437963.mockable.io/validate'
    //ensure that post data will match some properties (rather than testing that an object matches exactly)
    const expectedData = expect.objectContaining({
      email: 'email@gmail.com'
    })
    //assert that axios.post was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(url, expectedData)
  })

  //testing a mock post request was called with a v-model bound checkbox value
  test('sends post request with enterCompetition checkbox value on submit', () => {
    const axios = {
      post: jest.fn()
    }
    const wrapper = shallowMount(Form, {
      mocks: {
        axios
      }
    })
    const url = 'http://demo7437963.mockable.io/validate'
    //set the "No" radio button as checked
    wrapper.find('input[value="no"]').setChecked()
    //submit the form
    wrapper.find('button').trigger('submit')
    //assert that axios.post was called with the correct enterCompetition value
    expect(axios.post).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        enterCompetition: false
      })
    )
  })

  test('sends post request with default enterCompetition checkbox value on submit', () => {
    const axios = {
      post: jest.fn()
    }
    const wrapper = shallowMount(Form, {
      mocks: {
        axios
      }
    })
    const url = 'http://demo7437963.mockable.io/validate'
    wrapper.find('button').trigger('submit')
    expect(axios.post).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        enterCompetition: true
      })
    )
  })
})
