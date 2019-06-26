'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').index()
      table.text('description').notNullable()
      table.integer('number_items').notNullable()
      table.float('value_total').notNullable()
      table.enum('status', ['NEW', 'CANCEL', 'SHIPPED', 'DELIVERY', 'SHIPMENT_EXCEPTION'])
        .defaultTo('NEW')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
