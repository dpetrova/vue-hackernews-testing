module.exports = {
  src_folders: ['e2e/specs'], //directory that the test files are in
  output_folder: 'e2e/reports', //directory to which Nightwatch should output test reports
  selenium: {
    start_process: true, //tell nightwatch to start/stop the selenium process
    server_path: require('selenium-server').path, //Selenium Server binary path (exported by the selenium-server npm package)
    host: '127.0.0.1',
    port: 4444, //default Selenium Server port
    cli_args: {
      //set Nightwatch to start the Selenium process with the ChromeDriver path (using the path exported by the chromedriver package)
      'WebDriver.chrome.driver': require('chromedriver').path,
      //set Nightwatch to start the Selenium process with the Firefox Driver path (using the path exported by the geckdriver package)
      'WebDriver.gecko.driver': require('geckodriver').path
    }
  },
  test_settings: {
    default: {
      screenshots: {
        enabled: true, // if you want to keep screenshots
        path: 'e2e/screenshots' // save screenshots here
      },
      globals: {
        waitForConditionTimeout: 5000 // sometimes internet is slow so wait.
      },
      desiredCapabilities: {
        // use Chrome as the default browser for tests
        browserName: 'chrome',
        // uncomment the lines to run Chrome in headless mode
        // "chromeOptions" : {
        //    "args" : ["headless"]
        // }
        chromeOptions: {
          args: ['--no-sandbox'],
          w3c: false
        }
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true // turn off to test progressive enhancement
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox'
      }
    }
  }
  //   test_settings: {
  //     //settings for the chrome test environment (test environment is configured by passing the --env argument to Nightwatch)
  //     chrome: {
  //       desiredCapabilities: {
  //         browserName: 'chrome',
  //         chromeOptions: {
  //           args: ['--no-sandbox'],
  //           w3c: false
  //         }
  //       }
  //     }
  //   }
}
