'use strict'

const OrderHook = exports = module.exports = {}

OrderHook.updateValues = async model  => {

    model.$sideLoaded.subtotal = await model.items().getsum('subtotal')
}
