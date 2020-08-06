/**
 * @jest-environment node
 */

import { renderToString, render } from '@vue/server-test-utils'
import NotFound from '../NotFound.vue'

/* testing server-side rendered components */
describe('NotFound', () => {
  test('renders correctly on server ', async () => {
    //render the NotFound component to a string with Vue Server Test Utils
    const str = await renderToString(NotFound)
    expect(str).toMatchSnapshot()
  })

  test('renders 404 inside <h1> tag', async () => {
    //generate a Cheerio wrapper
    const wrapper = await render(NotFound)
    //find an <h1> tag, and asserts that it contains the text "404"
    expect(wrapper.find('h1').text()).toBe('404')
  })
})
