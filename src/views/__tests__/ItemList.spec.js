import { shallowMount } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'
import flushPromises from 'flush-promises' //using the flush-promises library
import { fetchListData } from '../../api/api' //import the mock fetchListData function to configure what it returns

jest.mock('../../api/api.js') //tell Jest to use the mock api file

describe('ItemList.vue', () => {
  //Stubbing a module dependency
  test('renders an Item with data for each item in window.items', async () => {
    //set the number of assertions the test should run, so that the test fails if a promise is rejected
    expect.assertions(4)
    //mock progress bar attached as Vue instance property
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    //sets items data for the component to use
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    //configure fetchListData to resolve with the items array
    fetchListData.mockImplementationOnce(() => Promise.resolve(items)) //fetchListData.mockResolvedValueOnce(items)
    // mounts ItemList with fake bar
    const wrapper = shallowMount(ItemList, { mocks: { $bar } })
    //waits until all pending promise callbacks have run
    await flushPromises()
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

  test('calls $bar start on load', () => {
    //create a fake $bar object
    const $bar = {
      start: jest.fn(), //create a jest mock function
      finish: () => {}
    }
    //make $bar available as this.$bar in ItemList
    shallowMount(ItemList, { mocks: { $bar } })
    //check that $bar.start was called once
    expect($bar.start).toHaveBeenCalledTimes(1)
  })

  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      finish: jest.fn() //create a jest mock function
    }
    shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()

    expect($bar.finish).toHaveBeenCalled()
  })

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      fail: jest.fn() //create a jest mock function
    }
    //reject when fetchListData is called, so you can test an error case
    fetchListData.mockImplementationOnce(() => Promise.reject()) //fetchListData.mockRejectedValueOnce()
    shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()

    expect($bar.fail).toHaveBeenCalled()
  })
})
