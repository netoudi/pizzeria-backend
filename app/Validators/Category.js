'use strict'

class Category {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required|max:255',
      image: 'required|max:255',
      description: 'required|max:255'
    }
  }
}

module.exports = Category
