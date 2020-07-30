import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises' //using the flush-promises library
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

//s a localVue constructor
const localVue = createLocalVue()
//install Vuex on the constructor
localVue.use(Vuex)

describe('ItemList.vue', () => {
  //define the variables that will be reassigned before each test
  let storeOptions
  let store

  beforeEach(() => {
    //reassign storeOptions before each test
    storeOptions = {
      getters: {
        displayItems: jest.fn() //set the getter as a mock
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve()) //set the mock action
      }
    }

    //reassigns the store as a new store before each test is run, so you have a fresh store for each test
    store = new Vuex.Store(storeOptions)
  })

  //Stubbing a module dependency
  test('renders an Item with data for each item in window.items', async () => {
    //mock progress bar attached as Vue instance property
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    //sets items data for the component to use
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    //mock the return result of displayItems
    storeOptions.getters.displayItems.mockReturnValue(items)
    //mount ItemList instance with fake bar, localVue and injected store
    const wrapper = shallowMount(ItemList, {
      mocks: { $bar }, //make $bar available as this.$bar in ItemList
      localVue,
      store
    })
    //creates a WrapperArray of Item components
    const foundItems = wrapper.findAllComponents(Item)
    //testing how many components are rendered:
    //use a WrapperArray length property to check that an Item is rendered for each item in window.items
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
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    //set dispatch to a mock function so you can check whether it was called correctly
    store.dispatch = jest.fn(() => Promise.resolve())
    shallowMount(ItemList, { mocks: { $bar }, localVue, store })
    //assert that dispatch was called with the correct arguments
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
      type: 'top'
    })
  })

  test('calls $bar start on load', () => {
    //create a fake $bar object
    const $bar = {
      start: jest.fn(), //create a jest mock function
      finish: () => {}
    }
    //mount ItemList instance with fake bar, localVue and injected store
    shallowMount(ItemList, {
      mocks: { $bar }, //make $bar available as this.$bar in ItemList
      localVue,
      store
    })
    //check that $bar.start was called once
    expect($bar.start).toHaveBeenCalled()
    //expect($bar.start).toHaveBeenCalledTimes(1)
  })

  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      finish: jest.fn() //create a jest mock function
    }
    shallowMount(ItemList, { mocks: { $bar }, localVue, store })
    await flushPromises()
    //ssert that $bar.finish was called
    expect($bar.finish).toHaveBeenCalled()
  })

  test('calls $bar fail when fetchListData unsuccessful', async () => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      fail: jest.fn() //create a jest mock function
    }
    //reject when fetchListData is called, so you can test an error case
    //mockRejectedValue is syntactic sugar around mockImplementation(() => Promise.reject())
    storeOptions.actions.fetchListData.mockRejectedValue()
    shallowMount(ItemList, { mocks: { $bar }, localVue, store })
    await flushPromises()
    //assert that $bar.fail was called
    expect($bar.fail).toHaveBeenCalled()
  })
})
