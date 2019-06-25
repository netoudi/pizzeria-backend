'use strict'

const Helpers = use('Helpers')
const Env = use('Env')
const crypto = use('crypto')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '2mb' })

      const fileName = `${crypto.randomBytes(16).toString('hex')}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), { name: fileName })

      if (!upload.moved()) {
        throw upload.error()
      }

      return response
        .status(200)
        .send({
          filename: fileName,
          url: `${Env.get('APP_URL')}/files/${fileName}`
        })
    } catch (err) {
      return response
        .status(400)
        .send(err)
    }
  }

  /**
   * Display a single file.
   * GET files/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.id}`))
  }
}

module.exports = FileController
