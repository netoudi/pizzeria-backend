'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderItemSchema extends Schema {
  up () {
    this.create('order_items', (table) => {
      table.increments()
      table.integer('order_id').unsigned().references('id').inTable('orders').index()
      table.integer('variant_id').unsigned().references('id').inTable('product_variants').index()
      table.integer('quantity').notNullable()
      table.float('value_unitary').notNullable()
      table.float('value_total').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_items')
  }
}

module.exports = OrderItemSchema
