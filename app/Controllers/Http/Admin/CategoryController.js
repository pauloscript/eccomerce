'use strict'

const Category = use('App/Models/Category')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param { Object } ctx.pagination //Middleware criado para trabalhar com paginação
   */
  async index({ request, response, view, pagination }) {
    //Busca de categoria por titulo com paginação

    const title = request.input('title')

    const query = Category.query() //Cria uma instancia de query()

    //Se o usuário fizer uma busca por titulo, essa palavra será buscada à alguma que tenha no banco, usando a clausula where e ILIKE
    //e então adicionada a instancia de query() para depois ser feita a paginação.
    if (title) {
      query.where('title', 'ILIKE', `%${title}%`)
    }

    const categories = await query.paginate(pagination.page, pagination.limit)

    return response.send(categories)
  }

  async store({ request, response }) {
    try {
      const { title, description, image_id } = request.all()

      const category = await Category.create({ title, description, image_id })

      return response.status(201).send(category)

    } catch (error) {

      return response.status(400).send({
        message: 'Erro ao processar a sua solicitação'
      })

    }
  }

  async show({ params: { id }, response }) {

    const category = await Category.findOrFail(id)


    return response.send(category)


  }

  async update({ params: { id }, request, response }) {

    const category = await Category.findOrFail(id)

    const { title, description, image_id } = request.all()

    category.merge({ title, description, image_id })

    await category.save()

    return response.send(category)

  }

  async destroy({ params: { id }, response }) {

    const category = await Category.findOrFail(id)

    await category.delete()

    return response.status(204).send()

  }
}

module.exports = CategoryController
