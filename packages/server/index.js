const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000; //TODO: .env 파일의 PORT 이름 DBPORT 등으로 수정하기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:8080' }));

app.get('/', (req, res) => {
  console.log('get /');
});

app.post('/api/auth/create-user', (req, res) => {
  console.log(req.body);
  //TODO: firebase로부터 온 요쳥이라면 JWT 토큰 생성하기
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
