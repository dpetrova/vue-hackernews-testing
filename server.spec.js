import request from 'supertest' //import SuperTest as a request
import app from './server' //import the application express app

/* integration tests */
describe('server', () => {
  //   test('returns 200', () => {
  //     //because SuperTest is asynchronous, you need to return the promise that it returns
  //     return request('https://www.facebook.com')
  //       .get('/') //make a get request to the root of the base URL
  //       .expect(200) //assert that the HTTP status code is a 200
  //   })

  test('/top returns 200', () => {
    return request(app) //create the server by passing the app to SuperTest
      .get('/top') //make a get request to the /top route
      .expect(200) //assert that the server responds with a 200
  })

  test('returns a 404 when page does not exist', () => {
    return request(app)
      .get('/does-not-exist')
      .expect(404)
  })
})
