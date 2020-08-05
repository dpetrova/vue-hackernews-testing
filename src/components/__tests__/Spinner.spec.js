import { shallowMount } from '@vue/test-utils'
import Spinner from '../Spinner.vue'

describe('Spinner.vue', () => {
  //snapshot test
  test('renders correctly', () => {
    //generate a snapshot with the root DOM node of the mounted Spinner component
    expect(shallowMount(Spinner).element).toMatchSnapshot()
  })
})
