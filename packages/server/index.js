const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const fbAdmin = require('./config/fbAdmin');

const app = express();
const port = 3000; //TODO: .env 파일의 PORT 이름 DBPORT 등으로 수정하기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:8080' }));

const getNaverAuthApiUri = (code, state) => {
  const REDIRECT_URI = 'http://localhost:3000/api/auth/naver-callback';

  return (
    'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
    process.env.REACT_APP_NAVER_CLIENT_ID +
    '&client_secret=' +
    process.env.REACT_APP_NAVER_CLIENT_SECRET +
    '&redirect_uri=' +
    REDIRECT_URI +
    '&code=' +
    code +
    '&state=' +
    state
  );
};

app.get('/api/auth/naver-callback', async (req, res) => {
  const { code, state } = req.query;
  const API_URI = getNaverAuthApiUri(code, state);

  const {
    data: { access_token },
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
    //TODO: DB에 유저 정보 저장하는 쿼리 실행
    //TODO: user객체의 정보는 노션 API 명세를 참고할 것
    //TODO 주소는 일단 아무 값으로나 저장하고 redirect 페이지에서 받는걸로
    console.log(user);
  } catch {
    //TODO: email 중복이 발생할 경우 DB에 정보를 저장하지 않음
  } finally {
    const token = ''; //TODO: fb 커스텀 토큰 생성 함수 연결
    res.json(token).redirect('http://localhost:8080/auth/callback');
  }
});

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
