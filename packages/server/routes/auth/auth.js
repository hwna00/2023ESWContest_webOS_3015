const router = require('express').Router();
const axios = require('axios');

const {
  fbCreateCustomToken,
  getNaverAuthApiUri,
} = require('./auth.controller');

router.get('/auth/naver-callback', async (req, res) => {
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
        res
          .cookie('token', token)
          .redirect('http://localhost:8080/auth/callback');
      })
      .catch(err => console.log(err));
  }
});

module.exports = router;
