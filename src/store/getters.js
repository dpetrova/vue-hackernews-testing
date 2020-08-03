export default {
  displayItems(state) {
    //cast the state.route.params.page value to a number; defaults to 1 if the page value is undefined
    const page = Number(state.route.params.page) || 1
    //calculate where the array should be sliced from
    const start = (page - 1) * 20
    //calculate what position in the array the last item should be
    const end = page * 20
    //return an array containing the correct items
    return state.items.slice(start, end)
  },
  maxPage(state) {
    return Math.ceil(state.items.length / 20)
  }
}
