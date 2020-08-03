import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'
import flushPromises from 'flush-promises'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import storeConfig from '../store-config'
import routerConfig from '../../router/router-config'
import { fetchListData } from '../../api/api' //import the mock fetchListData function to configure what it returns

//tell Jest to use the mock api file
jest.mock('../../api/api')

//creates a localVue constructor
const localVue = createLocalVue()
//install Vuex on the localVue constructor
localVue.use(Vuex)
//install Vue Router on the localVue constructor
localVue.use(Router)

//create a new store instance
const store = new Vuex.Store(storeConfig)
//reate a new router instance
const router = new Router(routerConfig)
//sync the store and the router, so that the store contains a router object in its state
sync(store, router)

//helper function to create an array of 22 objects
function createItems() {
  const arr = new Array(22)
  return arr.fill().map((item, i) => ({ id: `a${i}`, name: 'item' }))
}

describe('store-config', () => {
  test('calling fetchListData with the type returns top 20 displayItems from displayItems getter', async () => {
    //set the number of assertions the test should run, so that the test fails if a promise is rejected
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

    //some mock implementations:
    //fetchListData.mockImplementationOnce(() => Promise.resolve(items))
    //fetchListData.mockResolvedValueOnce(items)
    //fetchListData.mockImplementationOnce(() => Promise.reject())
    //fetchListData.mockRejectedValueOnce()

    //dispatch the action
    store.dispatch('fetchListData', { type })
    //wait for pending promise to resolve
    await flushPromises()
    //assert that displayItems returns the first 20 items
    expect(store.getters.displayItems).toEqual(items.slice(0, 20))
  })
})
