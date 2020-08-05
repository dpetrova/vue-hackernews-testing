//function that calls title if it’s a function and returns the value if it’s not
function getTitle(vm) {
  //destructure the title from the computed properties
  const { title } = vm.$options.computed
  //if title is a function, calls it with the component instance as the this value;
  // otherwise, returns the value of title
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title
  }
}

export const titleMixin = {
  mounted() {
    //const title = this.$options.computed.title
    const title = getTitle(this)
    if (title) {
      document.title = `Vue HN | ${title}`
    }
  },
  watch: {
    $route() {
      const title = getTitle(this)
      if (title) {
        document.title = `Vue HN | ${title}`
      }
    }
  }
}

export const yearMixin = {
  computed: {
    getCurrentYear() {
      return new Date().getFullYear()
    }
  }
}
