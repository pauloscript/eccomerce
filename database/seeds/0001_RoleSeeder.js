'use strict'


const Role = use('Role')

class RoleSeeder {
  async run () {
  
    //Criar admin
    await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Administrador do sistema!'
    })

    // Cria cargo de gerente
    await Role.create({
      name: 'Manager',
      alug: 'manager',
      description: 'Gerente da loja' 
    })

    //Criar o cargo de cliente
    await Role.create({
      name: 'Client',
      slug: 'client',
      description: 'Cliente da loja'
    })
  }
}

module.exports = RoleSeeder
