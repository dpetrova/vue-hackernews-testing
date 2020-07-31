import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises' //using the flush-promises library
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import mergeWith from 'lodash.mergewith'

//s a localVue constructor
const localVue = createLocalVue()
//install Vuex on the constructor
localVue.use(Vuex)

describe('ItemList.vue', () => {
  //a customizer function to overwrite empty objects and arrays
  //objValue -> is the value of a property in the target object
  //srcValue -> is the value of a property in the source object that takes precedence over the target object
  function customizer(objValue, srcValue) {
    //if the property that takes precedence is an array, overwrite the value rather than merging the arrays
    if (Array.isArray(srcValue)) {
      return srcValue
    }
    //if the property that takes precedence is an empty object, overwrite the property with an empty object
    if (srcValue instanceof Object && Object.keys(srcValue).length === 0) {
      return srcValue
    }
  }

  //factory function to create a Vuex store (accept optional overrides)
  function createStore(overrides) {
    //define default storeOptions
    const defaultStoreConfig = {
      getters: {
        displayItems: jest.fn() //set the getter as a mock
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve()) //set the mock action
      }
    }
    //return a store with optional merged overrides, so you have a fresh store for each test
    return new Vuex.Store(mergeWith(defaultStoreConfig, overrides, customizer))
  }

  //factory function to create wrapper object of a mounted component (accept optional overrides)
  function createWrapper(overrides) {
    //define the default mounting options
    const defaultMountingOptions = {
      //mock progress bar attached as Vue instance property to avoid errors when mounting the component
      mocks: {
        //make $bar available as this.$bar in ItemList
        $bar: {
          start: jest.fn(),
          finish: jest.fn(),
          fail: jest.fn()
        }
      },
      localVue,
      store: createStore()
    }

    //mount ItemList instance with fake bar, localVue and injected store and
    //return a wrapper with optional merged overrides
    return shallowMount(
      ItemList,
      mergeWith(defaultMountingOptions, overrides, customizer)
    )
  }

  //Stubbing a module dependency
  test('renders an Item with data for each item in displayItems', async () => {
    //set mock items data for the component to use
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    //create a store using mock items
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    })
    //create a wrapper, using the store you created as an override
    const wrapper = createWrapper({ store })
    //creates a WrapperArray of Item components
    const foundItems = wrapper.findAllComponents(Item)
    //assert that ItemList renders the correct number of Item components
    expect(foundItems).toHaveLength(items.length)
    //testing props:
    //check if each Item receive the correct data to render
    foundItems.wrappers.forEach((wrapper, i) => {
      //expect(wrapper.props().item).toBe(items[i])
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('dispatches fetchListData with top items', async () => {
    expect.assertions(1)
    const store = createStore()
    //set dispatch to a mock function so you can check whether it was called correctly
    store.dispatch = jest.fn(() => Promise.resolve())
    createWrapper({ store })
    await flushPromises()
    //assert that dispatch was called with the correct arguments
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
      type: 'top'
    })
  })

  test('calls $bar start on load', () => {
    //create a mocks object that contains a fake $bar object
    const mocks = {
      $bar: {
        start: jest.fn() //set $bar.start to a jest mock function
      }
    }
    //creates a wrapper; there’s no need to assign it to a variable.
    //creating the wrapper will mount the component and call $bar.start
    createWrapper({ mocks })
    //check that $bar.start was called once
    expect(mocks.$bar.start).toHaveBeenCalled()
    //expect(mocks.$bar.start).toHaveBeenCalledTimes(1)
  })

  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1)
    const mocks = {
      $bar: {
        finish: jest.fn()
      }
    }
    createWrapper({ mocks })
    await flushPromises()
    //assert that $bar.finish was called
    expect(mocks.$bar.finish).toHaveBeenCalled()
  })

  test('calls $bar fail when fetchListData unsuccessful', async () => {
    const store = createStore({
      //reject when fetchListData is called, so you can test an error case
      actions: { fetchListData: jest.fn(() => Promise.reject()) }
    })
    //store.actions.fetchListData.mockRejectedValue()
    //mockRejectedValue is syntactic sugar around mockImplementation(() => Promise.reject())

    const mocks = {
      $bar: {
        fail: jest.fn()
      }
    }
    createWrapper({ mocks, store })
    await flushPromises()
    expect(mocks.$bar.fail).toHaveBeenCalled()
  })
})
