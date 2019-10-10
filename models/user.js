const Sequelize = require('../node_modules/sequelize/types')
const sequelize = require('../bin/database')
const bcrypt = require("../node_modules/bcryptjs");

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  f_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  l_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING
  },
  dob: {
    type: Sequelize.DATE
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
    type: Sequelize.BOOLEAN
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      user.password = bcrypt.hashSync(user.password, 12)
    }
  }
});

module.exports = User