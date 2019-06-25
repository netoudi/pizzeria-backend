'use strict'

const ProductVariant = use('App/Models/ProductVariant')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with productvariants
 */
class ProductVariantController {
  /**
   * Show a list of all productvariants.
   * GET productvariants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const variants = await ProductVariant.all()

    return variants
  }

  /**
   * Create/save a new productvariant.
   * POST productvariants
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const variant = await ProductVariant.create(request.body)

    return variant
  }

  /**
   * Display a single productvariant.
   * GET productvariants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const variant = await ProductVariant.findByOrFail('id', params.id)

    return variant
  }

  /**
   * Update productvariant details.
   * PUT or PATCH productvariants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const variant = await ProductVariant.findByOrFail('id', params.id)

    variant.merge(request.body)

    await variant.save()

    return variant
  }

  /**
   * Delete a productvariant with id.
   * DELETE productvariants/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const variant = await ProductVariant.findByOrFail('id', params.id)

    await variant.delete()
  }
}

module.exports = ProductVariantController
