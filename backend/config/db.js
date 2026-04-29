require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host:    process.env.DB_HOST || '127.0.0.1',
    port:    process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected successfully');
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
    throw err;
  }
};

const query = async (sql, params = []) => {
  const [results] = await sequelize.query(sql, {
    replacements: params,
    type: Sequelize.QueryTypes.RAW,
  });
  return results;
};

module.exports = { sequelize, query, testConnection };