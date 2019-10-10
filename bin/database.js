const Sequelize = require('../node_modules/sequelize/types')

const sequelize = new Sequelize('usanailsdb', null, null, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
})

module.exports = sequelize

