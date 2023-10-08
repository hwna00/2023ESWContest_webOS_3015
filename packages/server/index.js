const express = require('express');
const cors = require('cors');

const user = require('./routes/user/user');
const hospital = require('./routes/hospital/hospital');
const doctor = require('./routes/doctor/doctor');
const auth = require('./routes/auth/auth');
const appointment = require('./routes/appointment/appointment');

require('dotenv').config();

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', auth);
app.use('/api', user);
app.use('/api', hospital);
app.use('/api', appointment);
app.use('/api', doctor);

let kakaoTid; // TODO : 깔끔하게 고치기
let partner_order_id;
let partner_user_id;

app.post('/api/payment/kakao-tid', (req, res) => {
  const { tid, PARTNER_ORDER_ID, PARTNER_USER_ID } = req.body;
  kakaoTid = tid;
  partner_order_id = PARTNER_ORDER_ID;
  partner_user_id = PARTNER_USER_ID;
});

app.get('/kakao-payment/callback', async (req, res) => {
  const { pg_token } = req.query;

  const API_URI = `https://kapi.kakao.com/v1/payment/approve?cid=${process.env.KAKAO_PAYMENT_CID}&tid=${kakaoTid}&partner_order_id=${partner_order_id}&partner_user_id=${partner_user_id}&pg_token=${pg_token}`;

  const payment_agree = await axios.post(API_URI, null, {
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_ADMIN_KEY}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
