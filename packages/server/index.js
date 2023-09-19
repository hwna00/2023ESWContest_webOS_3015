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
  code = req.query.code;
  state = req.query.state;
  const redirectURI = `http://localhost:3000/naver-callback`;

  api_url =
    'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
    process.env.REACT_APP_NAVER_CLIENT_ID +
    '&client_secret=' +
    process.env.REACT_APP_NAVER_CLIENT_SECRET +
    '&redirect_uri=' +
    redirectURI +
    '&code=' +
    code +
    '&state=' +
    state;

  const response = await axios.get(api_url, {
    headers: {
      'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  const {
    data: { access_token },
  } = response;

  const userProfile = await axios.get('https://openapi.naver.com/v1/nid/me', {
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  });

  console.log(userProfile);
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
