'use strict'

const User = use('App/Models/User')

class SignInController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const user = await User.query()
      .where('email', email)
      .where('type', 'CLIENT')
      .fetch()

    if (user.toJSON().length === 0) {
      return response.status(401).send({ message: 'Email or password invalid.' })
    }

    const token = await auth.attempt(email, password)

    return { user: user.first(), token }
  }
}

module.exports = SignInController
