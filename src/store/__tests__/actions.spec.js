import actions from '../actions'
import { fetchListData } from '../../api/api'
import flushPromises from 'flush-promises'

jest.mock('../../api/api')

describe('actions', () => {
  test('fetchListData calls commit with the result of fetchListData api service', async () => {
    expect.assertions(1)
    //create the data you need to pass in the tests
    const items = [{}, {}]
    const type = 'top'
    //return a resolved promise with the items if fetchListData is called with the correct type
    //otherwise, returns an empty resolved promise
    fetchListData.mockImplementation(calledWith => {
      return calledWith === type ? Promise.resolve(items) : Promise.resolve()
    })
    //create a mock context object
    const context = {
      commit: jest.fn()
    }
    //call fetchListData with mocked context and payload
    actions.fetchListData(context, { type })
    //wait for pending promise handlers
    await flushPromises()
    //assert that commit was called with the correct value
    expect(context.commit).toHaveBeenCalledWith('setItems', { items })
  })
})
