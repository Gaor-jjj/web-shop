const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Web_shop', 'root', 'qwerty', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;