'use strict'
const Product = use('App/Models/Product')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Object} ctx.pagination
   */
  async index({ request, response, pagination }) {
    const name = request.input('name')

    const query = Product.query()

    if (name) {
      query.where('name', 'ILIKE', `%${name}%`)
    }

    const products = await query.paginate(pagination.page, pagination.limit)

    return response.send(products)
  }

  async store({ request, response }) {
    try {
      const { name, description, price, image_id } = request.all()

      const product = await Product.create({
        name,
        description,
        price,
        image_id,
      })

      return response.status(201).send(product)
    } catch (error) {
      response
        .status(400)
        .send({ message: 'Não foi possivel cadastrar este produto!' })
    }
  }

  async show({ params: { id }, request, response, view }) {
    const product = await Product.findOrFail(id)

    return response.send(product)
  }

  async update({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id)

    try {
      const { name, description, price, image_id } = request.all()

      product.merge({ name, description, price, image_id })

      await product.save()

      return response.send(product)
    } catch (error) {
      return response
        .status(400)
        .send({ message: 'Não foi possivel atualizar este produto!' })
    }
  }

  async destroy({ params: { id }, request, response }) {
    const product = await Product.findOrFail(id)

    try {
      await product.delete()
      return response.status(204).send()
    } catch (error) {
      return response
        .status(500)
        .send({ message: 'Não foi possivel excluir este arquivo!' })
    }
  }
}

module.exports = ProductController
