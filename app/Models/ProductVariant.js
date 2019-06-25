'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class ProductVariant extends Model {
  static get computed () {
    return ['image_url']
  }

  getImageUrl ({ image }) {
    if (image === undefined || image === null) return null

    return `${Env.get('APP_URL')}/files/${image}`
  }

  product () {
    return this.belongsTo('App/Models/Product')
  }
}

module.exports = ProductVariant
