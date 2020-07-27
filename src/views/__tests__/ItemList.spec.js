import { shallowMount } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

describe('ItemList.vue', () => {
  test('renders an Item with data for each item in window.items', () => {
    //sets items data for the component to use
    window.items = [{}, {}, {}]
    // mounts ItemList
    const wrapper = shallowMount(ItemList)
    //creates a WrapperArray of Item components
    const items = wrapper.findAllComponents(Item)
    //testing how many components are rendered:
    //use a WrapperArray length property to check that an Item is rendered for each item in window.items
    expect(items).toHaveLength(window.items.length)
    //testing props:
    //check if each Item receive the correct data to render
    items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.props().item).toBe(window.items[i])
    })
  })
})
