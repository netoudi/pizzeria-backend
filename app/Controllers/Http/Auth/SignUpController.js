'use strict'

const User = use('App/Models/User')

class SignUpController {
  async store ({ request, auth }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create({ ...data, type: 'CLIENT' })

    const token = await auth.attempt(data.email, data.password)

    return { user, token }
  }
}

module.exports = SignUpController
