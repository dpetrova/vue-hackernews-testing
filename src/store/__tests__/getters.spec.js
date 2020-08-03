import getters from '../getters'

describe('getters', () => {
  test('displayItems returns the first 20 items from state.items', () => {
    //create an array with 21 items using fill and map to set each item to a number
    const items = Array(21)
      .fill()
      .map((v, i) => i)
    //create a fake state object
    const state = {
      items,
      route: {
        params: {}
      }
    }
    //get the return value of the getter
    const result = getters.displayItems(state)
    //assert that the returned array is first 20 items of the original array
    const expectedResult = items.slice(0, 20)
    expect(result).toEqual(expectedResult)
  })

  test('displayItems returns items 20-40 if page is 2', () => {
    //create an array of 40 items. Each item will be a number of the item index, so the array will be 0, 1, 2, 3 up to 39
    const items = Array(40)
      .fill()
      .map((v, i) => i)
    //call displayItems with a mock state
    const result = getters.displayItems({
      items,
      //set the mock page parameter to 2
      route: {
        params: {
          page: '2'
        }
      }
    })
    //assert that displayItems returns items with numbers from 19 to 39
    const expectedResult = items.slice(20, 40)
    expect(result).toEqual(expectedResult)
  })

  test('displayItems returns remaining items if there are not enough remaining items', () => {
    //create an array of 21 items. Each item will be a number of the item index, so the array will be 0, 1, 2, 3 up to 20
    const numberArray = Array(21)
      .fill()
      .map((v, i) => i)
    const store = {
      items: numberArray,
      route: {
        params: {
          page: '2'
        }
      }
    }
    const result = getters.displayItems(store)
    //assert that the item is the last item in the items array
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(numberArray[20])
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
