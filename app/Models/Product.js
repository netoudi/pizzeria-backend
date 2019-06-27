'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Product extends Model {
  static get computed () {
    return ['image_url']
  }

  getImageUrl ({ image }) {
    return `${Env.get('APP_URL')}/files/${image}`
  }

  category () {
    return this.belongsTo('App/Models/Category')
  }

  variants () {
    return this.hasMany('App/Models/ProductVariant')
  }
}

module.exports = Product
