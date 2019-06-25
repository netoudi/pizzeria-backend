'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    const user = await User.query()
      .where('email', email)
      .fetch()

    return {
      ...token,
      user: user.first()
    }
  }
}

module.exports = SessionController