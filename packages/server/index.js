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
    data: { access_token, refresh_token },
  } = await axios.get(API_URI, {
    headers: {
      'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });

  const {
    data: { response: user },
  } = await axios.get('https://openapi.naver.com/v1/nid/me', {
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  });

  try {
    const { email } = user;

    //TODO: SQL을 사용하여 user객체 안에 있는 email로 사용자 정보 가져오기
    //TODO: 사용자가 존재한다면 acces_token, refresh 토큰을 반환
    res
      .cookie('refreshToken', refresh_token, { httpOnly: true })
      .json({ accessToken: access_token });
  } catch {
    //TODO: 해당 email을 가진 사용자가 없는 경우, 새로운 유저를 생성
  }
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
