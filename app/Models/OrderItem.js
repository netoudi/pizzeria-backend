'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OrderItem extends Model {
  order () {
    return this.belongsTo('App/Models/Order')
  }

  productVariant () {
    return this.hasOne('App/Models/ProductVariant')
  }
}

module.exports = OrderItem
