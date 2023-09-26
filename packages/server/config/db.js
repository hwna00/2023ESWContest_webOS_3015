const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.HOUSTPITAL_HOST,
  user: process.env.HOUSTPITAL_USERNAME,
  password: process.env.HOUSTPITAL_PASSWORD,
  port: process.env.HOUSTPITAL_PORT,
  database: process.env.HOUSEPITAL_SCHEMAS,
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
