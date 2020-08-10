/* RUN A SERVER BEFORE START THE TESTS */

//start the dev server using production config
process.env.NODE_ENV = 'testing'
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const webpackConfig = require('../dist/webpack.prod.conf')
const devConfigPromise = require('../dist/webpack.dev.conf')

let server

devConfigPromise
  .then(devConfig => {
    const devServerOptions = devConfig.devServer
    const compiler = webpack(webpackConfig)
    server = new DevServer(compiler, devServerOptions)
    const port = devServerOptions.port
    const host = devServerOptions.host
    return server.listen(port, host)
  })
  .then(() => {
    const opts = ['--config', 'e2e/nightwatch.conf.js', '--env', 'chrome']
    const spawn = require('cross-spawn')
    //Spawn a subprocess that runs the nightwatch binary with the config path and env set to chrome
    //This spawns a child process that runs that command, which will start Nightwatch running.
    //The stdio inherit option tells the subprocess to log everything to the main process,
    //so you will see the output in the terminal when you run the script.
    const runner = spawn('./node_modules/.bin/nightwatch', opts, {
      stdio: 'inherit'
    })

    //spawn creates a stream.
    //you can use the on method to listen to events from the process
    //and close the server and the process when Nightwatch finishes running
    runner.on('exit', function(code) {
      server.close()
      process.exit(code)
    })

    //this callback will run when the server creates an error.
    //you should close the server and create the error in this process
    runner.on('error', function(err) {
      server.close()
      throw err
    })
  })
