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

Route.post('signup', 'Auth/SignUpController.store').validator('SignUp')
Route.post('signin', 'Auth/SignInController.store').validator('SignIn')
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

  Route.resource('variants', 'ProductVariantController')
    .validator(new Map([[['variants.store', 'variants.update'], ['ProductVariant']]]))
    .apiOnly()

  Route.resource('orders', 'OrderController')
    .validator(new Map([[['orders.store', 'orders.update'], ['Order']]]))
    .apiOnly()
}).middleware('auth')
