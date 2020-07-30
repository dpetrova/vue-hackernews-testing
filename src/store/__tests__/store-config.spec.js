import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import flushPromises from 'flush-promises'
import storeConfig from '../store-config'
import { fetchListData } from '../../api/api'

jest.mock('../../api/api') //mock api call

//creates a localVue constructor
const localVue = createLocalVue()
//install Vuex on the localVue constructor
localVue.use(Vuex)

//helper function to create an array of 22 objects
function createItems() {
  const arr = new Array(22)
  return arr.fill().map((item, i) => ({ id: `a${i}`, name: 'item' }))
}

describe('store-config', () => {
  test('calling fetchListData with the type returns top 20 displayItems from displayItems getter', async () => {
    expect.assertions(1)
    //create mock items for the test
    const items = createItems()
    //clone the storeConfig object, so that Vuex doesn’t reference the storeConfig.state object
    const clonedStoreConfig = cloneDeep(storeConfig)
    //create a store from a cloned config object
    const store = new Vuex.Store(clonedStoreConfig)
    const type = 'top'
    //use mocked api call to returns items if fetchListData is called with the correct type
    fetchListData.mockImplementation(calledType => {
      return calledType === type ? Promise.resolve(items) : Promise.resolve()
    })
    //dispatch the action
    store.dispatch('fetchListData', { type })
    //wait for pending promise to resolve
    await flushPromises()
    //assert that displayItems returns the first 20 items
    expect(store.getters.displayItems).toEqual(items.slice(0, 20))
  })
})
