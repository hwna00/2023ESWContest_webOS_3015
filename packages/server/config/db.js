const mysql = require('mysql2');

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
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
