const { Sequelize } = require('sequelize');
const path = require('path');

// Load dotenv only if available (not needed in production/serverless)
try {
  require('dotenv').config();
} catch (e) {
  // Ignore
}

// Use Neon serverless driver in production
let neonConfig = {};
if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  try {
    const { neonConfig: nc } = require('@neondatabase/serverless');
    const ws = require('ws');
    nc.webSocketConstructor = ws;
    neonConfig = {
      dialectModule: require('@neondatabase/serverless'),
    };
  } catch (e) {
    // Neon serverless not available, use regular pg
  }
}

let sequelize;

// Option 1: Use DATABASE_URL connection string (recommended for Neon/Vercel)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    ...neonConfig,
  });
// Option 2: Use individual env vars
} else if (process.env.DB_DIALECT === 'postgres') {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? {
          require: true,
          rejectUnauthorized: false,
        } : false,
      },
      logging: false,
    }
  );
// Option 3: SQLite for local development only
} else if (process.env.NODE_ENV !== 'production') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'data.sqlite'),
    logging: false,
  });
} else {
  // In production, DATABASE_URL must be set
  throw new Error('DATABASE_URL environment variable is required in production');
}

module.exports = { sequelize };
