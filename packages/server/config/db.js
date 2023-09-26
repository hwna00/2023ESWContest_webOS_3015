const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
  host: process.env.HOUSTPITAL_HOST,
  user: process.env.HOUSTPITAL_USERNAME,
  password: process.env.HOUSTPITAL_PASSWORD,
  port: process.env.HOUSTPITAL_PORT,
};

const pool = mysql.createPool(dbConfig);

pool.getConnection(err => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공');
  }
});

module.exports = pool;
