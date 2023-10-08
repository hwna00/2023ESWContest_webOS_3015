const fbAdmin = require('../config/fbAdmin');

const getKakaoAuthapiuri = (code, state) => {

};

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

const fbCreateCustomToken = async uid => {
  return await fbAdmin.auth().createCustomToken(uid);
};

module.exports = {
  getNaverAuthApiUri,
  fbCreateCustomToken,
};