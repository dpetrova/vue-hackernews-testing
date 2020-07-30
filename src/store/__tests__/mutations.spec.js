import mutations from '../mutations'

describe('mutations', () => {
  test('setItems sets state.items to items', () => {
    //create an items array that you’ll add to the payload object
    const items = [{ id: 1 }, { id: 2 }]
    //create a fake state object
    const state = {
      items: []
    }
    //call the setItems mutation with the fake state object and a payload object
    mutations.setItems(state, { items })
    //assert that state.items has been set to the items passed in the payload object
    expect(state.items).toBe(items)
  })
})
