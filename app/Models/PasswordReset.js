'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PasswordReset extends Model {
    static boot(){
        super.boot()

        this.addHook('beforeCreate', async model => {

            model.token = await str_random(25)

            const expires_at = new Date()

            expires_at.setMinutes(expires_at.getMinutes() + 30)//Tempo de expiração do token definido em 30 minutos

            model.expires_at = expires_at
        })
    }

    //Tratamento do formato das datas para o banco de dados
    static get dates() {
        return ['created_at', 'update_at', 'expires_at']
    }

    
}

module.exports = PasswordReset
