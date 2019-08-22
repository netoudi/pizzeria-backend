'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderItem extends Model {
  order () {
    return this.belongsTo('App/Models/Order')
  }

  variant () {
    return this.hasOne('App/Models/ProductVariant', 'variant_id', 'id')
  }
}

module.exports = OrderItem
