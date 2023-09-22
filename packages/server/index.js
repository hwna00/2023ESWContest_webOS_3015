const express = require('express');
const cors = require('cors');
const axios = require('axios')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/auth/login/kakao-callback', async (req, res) => {
  const {code} = req.query
  const REDIRECT_URI = 'http://localhost:3000/auth/login/kakao-callback'

  const API_URI =
  'https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=' +
  process.env.REACT_APP_KAKAO_CLIENT_ID +
  '&redirect_uri=' +
  REDIRECT_URI +
  '&code=' +
  code +
  '&ClientSecret=' +
  process.env.REACT_APP_KAKAO_CLIENT_SECRET;

  const {data: {access_token}} = await axios.post(API_URI, {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
  });
  
  const profile = await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      "Authorization": `Bearer ${access_token}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
    },
  });

  console.log(profile)
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
