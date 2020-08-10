/* 
THESE TESTS ARE EXECUTED AGAINST RUNNING APP
NEED TO START SERVER BEFORE RUN TESTS (npm run serve)
*/

module.exports = {
  'clicking on a comments link redirects to the item page': function(browser) {
    browser
      //navigates to the running app
      .url('http://localhost:8080')
      //wait for an item with the news-item class.
      //this makes sure the items are rendered before you try to click the Comments link
      .waitForElementVisible('.item', 15000)
      //click the Comments link
      .click('.comments-link>a')
      //assert that the URL now contains /item (this means the route has worked correctly)
      .assert.urlContains(`/item`)
      //assert that the item-view component is visible
      .waitForElementVisible('.item-view', 15000)
      .end()
  },
  'clicking on a user redirects to the user page': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('.item', 15000)
      .click('.by a')
      .assert.urlContains(`/user`)
      .waitForElementVisible('.user-view', 30000)
      .end()
  },
  'paginates items correctly': function(browser) {
    let originalItemListText
    browser
      .url('http://localhost:8080')
      //wait until the items have loaded
      .waitForElementVisible('.item', 15000)
      //get the text of the .item-list element, and stores it in a variable
      .getText('.item-list', function(result) {
        originalItemListText = result.value
      })
      //click the More link (pagination next > first a is prev, second is next)
      .click('.item-list-nav a:nth-of-type(2)')
      //wait until the progress bar has disappeared (until the new items have loaded)
      .waitForElementNotPresent('.progress hidden', 15000)
      //perform is a command that gives you a callback in which to execute commands
      //here, you’re using the callback to perform an expect assertion
      //to make sure the text in the .item-list element is not the same as the original text
      //this assertion checks that the .item-list has updated
      .perform(() => {
        browser.expect
          .element('.item-list')
          .text.to.not.equal(originalItemListText)
      })
      //click the Prev link
      .click('.item-list-nav a')
      .waitForElementNotPresent('.progress hidden', 15000)
      //assert that the text has changed again to originalItemListText
      .perform(() => {
        browser.expect.element('.item-list').text.to.equal(originalItemListText)
      })
  },
  'changes list by clicking through nav': function(browser) {
    let originalItemListText
    browser
      .url('http://localhost:8080')
      //wait until the items have loaded
      .waitForElementVisible('.item', 15000)
      //get the text of the .item-list element, and stores it in a variable
      .getText('.item-list', function(result) {
        originalItemListText = result.value
      })
      //click a link to load a new list
      .click('.header a:nth-of-type(2)')
      .waitForElementNotPresent('.progress hidden', 15000)
      //assert that the .item-list has updated by comparing new text to old text before loading a new list
      .perform(() => {
        browser.expect
          .element('.item-list')
          .text.to.not.equal(originalItemListText)
      })
      //store the current list text
      .getText('.item-list', function(result) {
        originalItemListText = result.value
      })
      //load a new list by clicking a link
      .click('.header a:nth-of-type(4)')
      .waitForElementNotPresent('.progress hidden', 15000)
      //assert that item-list has updated
      .perform(() => {
        browser.expect
          .element('.item-list')
          .text.to.not.equal(originalItemListText)
      })
  }
}
