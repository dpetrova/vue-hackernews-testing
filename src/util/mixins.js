//function that calls title if it’s a function and returns the value if it’s not
function getTitle(vm) {
  //destructure the title value from the component options
  const { title } = vm.$options
  //if title is a function, calls it with the component instance as the this value;
  // otherwise, returns the value of title
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title
  }
}

export const titleMixin = {
  mounted() {
    //const title = this.$options.title
    const title = getTitle(this)
    if (title) {
      document.title = `Vue HN | ${title}`
    }
  }
}
