module.exports = {
  'sanity test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('.item-list', 5000)
      .end()
  }
}
