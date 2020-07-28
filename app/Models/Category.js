'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {

    //Relacionamento entre Categoria e Imagem de destaque

    image () {
        return this.belongsTo('App/Models/Image')
    }

    //Relacionamento entre Produto e Imagens (galeria de imagens do produto!)

    images () {
        return this.belongsToMany('App/Models/Image')
    }

    //Relacionamento entre Produtos e Categorias

    products () {
        return this.belongsToMany('App/Models/Product')
    }

    //Relacionamento entre Produtos e Cupons de desconto

    coupons() {
        return this.belongsToMany('App/Models/Coupon')
    }
}

module.exports = Category
