'use strict'

const Factory = use('Factory')
const Role = use('Role')
const User = use('App/Models/User')

class ClientSeeder {
  async run () {
    const role = await Role.findBy('slug', 'client')
    const Clients = await Factory.model('App/Models/User')
  }
}

module.exports = ClientSeeder
