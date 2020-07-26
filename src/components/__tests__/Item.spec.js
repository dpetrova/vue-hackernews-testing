import Item from '../Item.vue'
//import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'

describe('Item.vue', () => {
  // manual mounting the component
  //   test('renders "item"', () => {
  //     //constructor function: a function used with the new operator
  //     const Ctor = Vue.extend(Item) //creates a new Vue constructor with the Item options
  //     const vm = new Ctor().$mount() //creates a new Vue instance, and mounts the Vue instance
  //     expect(vm.$el.textContent).toContain('item') //accesses the DOM element, and checks the text content
  //   })

  // using Vue Test Utils to mounting the component
  test('renders "item"', () => {
    //returns a wrapper containing a mounted Item
    //const wrapper = mount(Item) //mount method render entire component tree
    const wrapper = shallowMount(Item) //shallowMount renders the component tree only one level deep (stubs all the children of a component before it mounts it)
    debugger
    //check textContent of the instance element
    expect(wrapper.text()).toContain('item')
  })
})
