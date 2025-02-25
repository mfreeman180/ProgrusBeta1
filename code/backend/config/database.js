const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'MFreePSQL', // Replace with your actual username
  password: 'PrivPSQL18', // Replace with your actual password
  database: 'progrus_db'
});

module.exports = sequelize;