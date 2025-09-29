const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const DB_DIALECT = process.env.DB_DIALECT || 'sqlite';

let sequelize;
if (DB_DIALECT === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'data.sqlite'),
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: process.env.DB_DIALECT || 'postgres',
      logging: false,
    }
  );
}

module.exports = { sequelize };