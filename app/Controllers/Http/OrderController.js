'use strict'

const Database = use('Database')
const Order = use('App/Models/Order')
const ProductVariant = use('App/Models/ProductVariant')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const orders = await Order.query()
      .where('user_id', auth.user.id)
      .with('user')
      .with('items.variant.product')
      .with('address')
      .orderBy('created_at', 'desc')
      .paginate(1, 10)

    return orders.toJSON().data
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only(['description', 'address', 'items', 'number_items', 'value_total'])

    const productVariants = await ProductVariant.query()
      .whereIn('id', data.items.map(i => i.variant_id))
      .fetch()

    const productVariantsArr = productVariants.toJSON()

    // Sanitize order items
    const orderItems = data.items.map((item) => {
      const productVariant = productVariantsArr.find(i => i.id === item.variant_id)

      return {
        quantity: item.quantity,
        value_unitary: item.value_unitary,
        value_total: item.value_total,
        ...productVariant
      }
    })

    // Validate order items
    const isValidItems = orderItems.every(p => {
      return p.value_unitary === p.price && p.value_total === (p.quantity * p.price)
    })

    const userId = auth.user.id
    const numberItems = orderItems.length
    const valueTotal = parseFloat(
      orderItems.reduce((acc, curr) => acc + curr.value_total, 0).toFixed(2)
    )

    // Check order is valid
    if (!isValidItems || data.number_items !== numberItems || data.value_total !== valueTotal) {
      return response.status(400)
        .send({
          message: 'Data for order is incorrect.',
          isValidItems,
          numberItems,
          valueTotal
        })
    }

    // Start transaction
    const trx = await Database.beginTransaction()

    // Create new Order
    const order = await Order.create({
      user_id: userId,
      description: data.description,
      value_total: valueTotal,
      number_items: numberItems
    }, trx)

    // Save Order Items
    await order.items().createMany(data.items.map(item => ({
      variant_id: item.variant_id,
      quantity: item.quantity,
      value_unitary: item.value_unitary,
      value_total: item.value_total
    })), trx)

    // Save Order Address
    await order.address().create({
      zipcode: data.address.zipcode,
      street: data.address.street,
      number: data.address.number,
      neighborhood: data.address.neighborhood,
      city: data.address.city,
      state: data.address.state
    }, trx)

    // Execute and close transaction
    await trx.commit()

    // Loads relationships
    await order.load('user')
    await order.load('items')
    await order.load('address')

    return order
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const order = await Order.query()
      .where('id', params.id)
      .with('user')
      .with('items')
      .with('address')
      .fetch()

    if (order.toJSON().length === 0) {
      return response.status(404).send()
    }

    return order
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OrderController
