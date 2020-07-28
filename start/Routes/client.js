'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

  //Product Resource Routes
  Route.get('/products', 'ProductController.index')
  Route.get('/products/:id', 'ProductController.show')

  //Product Resource Routes
  Route.resource('/orders', 'OrderController').apiOnly()
})
  .prefix('v1')
  .namespace('Client')
