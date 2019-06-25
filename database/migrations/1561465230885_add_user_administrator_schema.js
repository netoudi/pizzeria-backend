'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const User = use('App/Models/User')

class AddUserAdministratorSchema extends Schema {
  async up () {
    await User.create({
      name: 'Administrator',
      email: 'admin@user.com',
      password: 'secret',
      type: 'ADMINISTRATOR'
    })
  }

  down () {
    //
  }
}

module.exports = AddUserAdministratorSchema
