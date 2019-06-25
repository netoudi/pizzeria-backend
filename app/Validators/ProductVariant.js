'use strict'

class ProductVariant {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      product_id: 'required|exists:products,id',
      title: 'required|max:255',
      price: 'required|number|range:0,100000'
    }
  }
}

module.exports = ProductVariant
