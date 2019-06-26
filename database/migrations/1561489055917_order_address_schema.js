'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderAddressSchema extends Schema {
  up () {
    this.create('order_addresses', (table) => {
      table.increments()
      table.integer('order_id').unsigned().references('id').inTable('orders').index()
      table.string('zipcode').notNullable()
      table.string('street').notNullable()
      table.string('number').notNullable()
      table.string('neighborhood').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('order_addresses')
  }
}

module.exports = OrderAddressSchema
