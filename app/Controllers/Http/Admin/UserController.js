'use strict'
const User = use('App/Models/User')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Object} ctx.pagination
   */
  async index({ request, response, view, pagination }) {
    const name = request.input('name')

    const query = User.query()

    if (name) {
      query.where('name', 'ILIKE', `%${name}`)
    }

    const users = await query.paginate(pagination.page, pagination.limit)

    return response.send(users)
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store({ request, response, view }) {
    try {
      const userData = request.only([
        'name',
        'surname',
        'email',
        'password',
        'image_id',
      ])

      const user = await User.create(userData)

      return response.status(201).send(user)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possivel cadastrar este usuário!' })
    }
  }

  async show({ params: { id }, response }) {
    const user = await User.findOrFail(id)

    return response.send(user)
  }

  async update({ params: { id }, request, response }) {
    const user = await User.findOrFail(id)

    const userData = request.only([
      'name',
      'surname',
      'email',
      'password',
      'image_id',
    ])

    user.merge(userData)
    await user.save()

    return response.send(user)
  }

  async destroy({ params: { id }, request, response }) {
    const user = await User.findOrFail(id)

    try {
      user.delete()
      return response.status(204).send()
    } catch (error) {
      response
        .status(500)
        .send({ message: 'Não foi possível deleter este usuário' })
    }
  }
}

module.exports = UserController
