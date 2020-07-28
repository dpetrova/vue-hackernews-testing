import { shallowMount } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  //mock timer functions so be able to move fake time forward programatically
  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar)
    //testing classes (e.g. when you add a class dynamically)
    expect(wrapper.classes()).toContain('hidden')
  })

  test('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar)
    //testing style (e.g. when you add an inline style dynamically)
    expect(wrapper.element.style.width).toBe('0%')
  })

  //testing component methods
  test('displays the bar when start is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    //asserts that initially the hidden class exists
    expect(wrapper.classes()).toContain('hidden')
    //triggers the test input by calling the start method on the component instance
    wrapper.vm.start()
    //wait for updates to happen, to be sure that we’re testing the final rendered results
    await wrapper.vm.$nextTick()
    //asserts that the hidden class was removed
    expect(wrapper.classes()).not.toContain('hidden')
  })

  test('sets the bar to 100% width when finish is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start() //puts the component in a dirty state by calling start
    wrapper.vm.finish()
    await wrapper.vm.$nextTick()
    expect(wrapper.element.style.width).toBe('100%')
  })

  test('hides the bar when finish is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    wrapper.vm.finish()
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('hidden')
  })

  test('resets to 0% width when start is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.finish()
    wrapper.vm.start()
    await wrapper.vm.$nextTick()
    expect(wrapper.element.style.width).toBe('0%')
  })

  test('removes error class when start is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.fail()
    wrapper.vm.start()
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).not.toContain('error')
  })

  test('styles the bar correctly when fail is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.fail()
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('error')
  })

  test('sets the bar to 100% width when fail is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.fail()
    await wrapper.vm.$nextTick()
    expect(wrapper.element.style.width).toBe('100%')
  })

  test('increases width by 1% every 100ms after start call', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    jest.runTimersToTime(100) //move fake time forward
    await wrapper.vm.$nextTick()
    expect(wrapper.element.style.width).toBe('1%')
    jest.runTimersToTime(900) //move fake time forward
    await wrapper.vm.$nextTick()
    expect(wrapper.element.style.width).toBe('10%')
    jest.runTimersToTime(4000) //move fake time forward
    await wrapper.vm.$nextTick()
    expect(wrapper.element.style.width).toBe('50%')
  })

  //jest.spyOn(window, 'someMethod')
  //window.someMethod ()
  //expect(window.someMethod).toHaveBeenCalled()

  test('clears timer when finish is called', async () => {
    //spies on the clearInterval function
    jest.spyOn(window, 'clearInterval') //create a spy to be able to check that a function in API was called
    //configures the fake timer setInterval to return a certain value
    setInterval.mockReturnValue(123)
    const wrapper = shallowMount(ProgressBar)
    //call start to start the timer
    wrapper.vm.start()
    wrapper.vm.finish()
    await wrapper.vm.$nextTick()
    //asserts that the clearInterval mock was called with the value returned from setInterval
    expect(window.clearInterval).toHaveBeenCalledWith(123)
  })
})
