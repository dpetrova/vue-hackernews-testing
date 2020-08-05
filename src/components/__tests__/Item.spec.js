import Item from '../Item.vue'
//import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'

describe('Item.vue', () => {
  //create a mock item to pass in
  const item = {
    title: 'Item',
    url: 'https://subdomain.domain.com/path',
    by: 'Pesho',
    score: 100
  }
  // manual mounting the component
  //   test('renders "item"', () => {
  //     //constructor function: a function used with the new operator
  //     const Ctor = Vue.extend(Item) //creates a new Vue constructor with the Item options
  //     const vm = new Ctor().$mount() //creates a new Vue instance, and mounts the Vue instance
  //     expect(vm.$el.textContent).toContain('item') //accesses the DOM element, and checks the text content
  //   })
  // using Vue Test Utils to mounting the component
  //   test('renders "item"', () => {
  //     //returns a wrapper containing a mounted Item
  //     //const wrapper = mount(Item) //mount method render entire component tree
  //     const wrapper = shallowMount(Item) //shallowMount renders the component tree only one level deep (stubs all the children of a component before it mounts it)
  //     //debugger //set a debugger statement
  //     //check textContent of the instance element
  //     expect(wrapper.text()).toContain('item')
  //   })

  //test host filter
  test('renders the hostname', () => {
    const wrapper = shallowMount(Item, { propsData: { item } })
    //testing text content of elements
    expect(wrapper.text()).toContain('subdomain.domain.com')
  })

  test('renders item.by', () => {
    const wrapper = shallowMount(Item, { propsData: { item } })
    //testing text content of elements
    expect(wrapper.text()).toContain(item.by)
  })

  test('renders item.score', () => {
    const wrapper = shallowMount(Item, { propsData: { item } })
    //testing text content of elements
    expect(wrapper.text()).toContain(item.score)
  })

  test('renders a link to the item.url with item.title as text', () => {
    const wrapper = shallowMount(Item, { propsData: { item } })
    const a = wrapper.find('a')
    //testing text content of elements
    expect(a.text()).toBe(item.title)
    //testing DOM attributes
    expect(a.attributes().href).toBe(item.url)
  })

  //test timeAgo filter
  test('renders the time since the last post', () => {
    //spy on the Date.now function
    const dateNow = jest.spyOn(Date, 'now')
    //mock dateNow to always call the same time
    const dateNowTime = new Date('2020')
    dateNow.mockImplementation(() => dateNowTime)

    //create a mock item to pass in
    const item = {
      //create a UNIX time value that is 10 minutes ago from the mocked current time
      time: dateNowTime / 1000 - 600
    }
    //mount the Item
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    //restore the dateNow mock before running the assertion
    dateNow.mockRestore()
    //assert that the wrapper output contains 10 minutes ago
    expect(wrapper.text()).toContain('10 minutes ago')
  })
})
