const express = require('express');
const cors = require('cors');
const fbAdmin = require('./config/fbAdmin');

const app = express();
const port = 3000; //TODO: .env 파일의 PORT 이름 DBPORT 등으로 수정하기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:8080' }));

const fbCreateCustomToken = uid => {
  fbAdmin
    .auth()
    .createCustomToken(uid)
    .then(customToken => {
      return customToken;
    })
    .catch(error => {
      console.log('Error creating custom token:', error);
    });
};

app.get('/api/users/me', (req, res) => {
  console.log('me');
  //TODO: DB로부터 사용자 정보 검색
  res.json({});
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
