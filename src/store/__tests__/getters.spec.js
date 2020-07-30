import getters from '../getters'

describe('getters', () => {
  test('displayItems returns the first 20 items from state.items', () => {
    //create an array with 21 items using fill and map to set each item to a number
    const items = Array(21)
      .fill()
      .map((v, i) => i)
    //create a fake state object
    const state = {
      items
    }
    //get the return value of the getter
    const result = getters.displayItems(state)
    //assert that the returned array is first 20 items of the original array
    const expectedResult = items.slice(0, 20)
    expect(result).toEqual(expectedResult)
  })

  test('maxPage returns a rounded number using the current items', () => {
    //create an array of 49 items
    const items = Array(49)
      .fill()
      .map((v, i) => i)
    //get the return value of the getter as passing the fake state
    const result = getters.maxPage({
      items
    })
    //assert that the returned value is rounded up to the nearest integer
    expect(result).toBe(3)
  })
})
