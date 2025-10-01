const { Sequelize } = require('sequelize');
require('dotenv').config();

// Force Postgres for Lambda (recommended)
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT || 5432);

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
  throw new Error('Database environment variables are missing. Required: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, optional DB_PORT');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false,
});

module.exports = { sequelize };
