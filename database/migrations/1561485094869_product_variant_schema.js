'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductVariantSchema extends Schema {
  up () {
    this.create('product_variants', (table) => {
      table.increments()
      table.integer('product_id').unsigned().references('id').inTable('products').index()
      table.string('title').notNullable()
      table.string('image')
      table.float('price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_variants')
  }
}

module.exports = ProductVariantSchema
