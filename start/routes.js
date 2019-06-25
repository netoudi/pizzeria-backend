'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('sessions', 'SessionController.store').validator('Session')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.resource('categories', 'CategoryController')
    .validator(new Map([[['categories.store', 'categories.update'], ['Category']]]))
    .apiOnly()

  Route.resource('products', 'ProductController')
    .validator(new Map([[['products.store', 'products.update'], ['Product']]]))
    .apiOnly()
}).middleware('auth')
