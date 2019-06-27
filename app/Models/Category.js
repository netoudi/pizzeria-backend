'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Category extends Model {
  static get computed () {
    return ['image_url']
  }

  getImageUrl ({ image }) {
    return `${Env.get('APP_URL')}/files/${image}`
  }

  products () {
    return this.hasMany('App/Models/Product')
  }
}

module.exports = Category
