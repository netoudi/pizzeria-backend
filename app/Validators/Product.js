'use strict'

class Product {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      category_id: 'required|exists:categories,id',
      title: 'required|max:255',
      image: 'required|max:255',
      description: 'required|max:255'
    }
  }
}

module.exports = Product
