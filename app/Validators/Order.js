'use strict'

class Order {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      description: 'required|max:255',
      number_items: 'required|number',
      value_total: 'required|number',

      address: 'required|object',
      'address.zipcode': 'required',
      'address.street': 'required',
      'address.number': 'required',
      'address.neighborhood': 'required',
      'address.city': 'required',
      'address.state': 'required',

      items: 'required|array',
      'items.*.variant_id': 'required|exists:product_variants,id',
      'items.*.quantity': 'required|integer',
      'items.*.value_unitary': 'required|number',
      'items.*.value_total': 'required|number'
    }
  }
}

module.exports = Order
