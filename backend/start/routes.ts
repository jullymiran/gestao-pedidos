/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})
router.get('/products', [controllers.Products, 'index'])
router.post('/products', [controllers.Products, 'store'])
router.get('/products/:id', [controllers.Products, 'show'])
router.put('/products/:id', [controllers.Products, 'update'])

router.get('/customers', [controllers.Customers, 'index'])
router.post('/customers', [controllers.Customers, 'store'])
router.get('/customers/:id', [controllers.Customers, 'show'])
router.put('/customers/:id', [controllers.Customers, 'update'])

router.get('/orders', [controllers.Orders, 'index'])
router.get('/orders/:id', [controllers.Orders, 'show'])

router.post('/orders', [controllers.Orders, 'store'])

router.put('/orders/:id/status', [controllers.Orders, 'updateStatus'])

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
