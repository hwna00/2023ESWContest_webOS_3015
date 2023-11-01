const router = require('express').Router();
const axios = require('axios');

const {
  fbCreateCustomToken,
  getNaverAuthApiUri,
} = require('./auth.controller');

router.get('/auth/naver-callback', async (req, res) => {
  const { code, state, from } = req.query;
  console.log('from', from);
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
      Authorization: `Bearer ${access_token}`,
    },
  });

  try {
    // TODO: DB에 유저 정보 저장하는 쿼리 실행
    // TODO: user객체의 정보는 노션 API 명세를 참고할 것
    // TODO 주소는 일단 아무 값으로나 저장하고 redirect 페이지에서 받는걸로
  } catch {
    // TODO: email 중복이 발생할 경우 DB에 정보를 저장하지 않음
  } finally {
    fbCreateCustomToken(user.id)
      .then(token => {
        res.cookie('token', token).redirect(`${from}#/auth/callback`);
      })
      .catch(err => console.log(err));
  }
});

router.get('/auth/login/kakao-callback', async (req, res) => {
  const { code } = req.query;
  const REDIRECT_URI = 'http://localhost:3000/api/auth/login/kakao-callback';

  const API_URI =
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${
      process.env.REACT_APP_KAKAO_CLIENT_ID
    }&redirect_uri=${
      REDIRECT_URI
    }&code=${
      code
    }&ClientSecret=${
      process.env.REACT_APP_KAKAO_CLIENT_SECRET}`;

  const {
    data: { access_token },
  } = await axios.post(API_URI, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });

  const { data: user } = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  fbCreateCustomToken(user.id.toString())
    .then(token => {
      res
        .cookie('token', token)
        .redirect('http://localhost:8080/#/auth/callback');
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
