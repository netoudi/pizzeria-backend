'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  address () {
    return this.hasOne('App/Models/OrderAddress')
  }

  items () {
    return this.hasMany('App/Models/OrderItem')
  }
}

module.exports = Order
