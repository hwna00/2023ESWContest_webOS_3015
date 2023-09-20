const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/naver-callback', async (req, res) => {
  const { code, state } = req.query;
  const REDIRECT_URI = `http://localhost:3000/naver-callback`;

  const API_URI =
    'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
    process.env.REACT_APP_NAVER_CLIENT_ID +
    '&client_secret=' +
    process.env.REACT_APP_NAVER_CLIENT_SECRET +
    '&redirect_uri=' +
    REDIRECT_URI +
    '&code=' +
    code +
    '&state=' +
    state;

  const {
    data: { access_token },
  } = await axios.get(API_URI, {
    headers: {
      'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });

  const {
    data: { response },
  } = await axios.get('https://openapi.naver.com/v1/nid/me', {
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  });

  //TODO: response의 사용자 데이터를 DB에 저장하는 로직 추가 필요

  //TODO: 받지 못한 정보를 받기 위해서 form 페이지로 이동
  res.redirect('http://localhost:8080/thirdparth-callback');
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
