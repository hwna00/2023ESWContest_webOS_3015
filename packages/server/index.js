const http = require('http');

const SocketIO = require('socket.io');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const user = require('./routes/user/user');
const review = require('./routes/review/review');
const hospital = require('./routes/hospital/hospital');
const emergency = require('./routes/emergency/emergency');
const doctor = require('./routes/doctor/doctor');
const diagnosis = require('./routes/diagnosis/diagnosis');
const counselor = require('./routes/counselor/counselor');
const auth = require('./routes/auth/auth');
const appointment = require('./routes/appointment/appointment');

require('dotenv').config();

const app = express();
const port = 3000 || process.env.PORT;
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', auth);
app.use('/api', user);
app.use('/api', hospital);
app.use('/api', appointment);
app.use('/api', doctor);
app.use('/api', review);
app.use('/api', diagnosis);
app.use('/api', counselor);
app.use('/api', emergency);

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

wsServer.on('connection', socket => {
  socket.on('join_room', roomName => {
    socket.join(roomName);
    socket.to(roomName).emit('welcome');
  });

  //* rtc area
  socket.on('offer', (offer, roomName) => {
    console.log(offer);
    socket.to(roomName).emit('offer', offer);
  });

  socket.on('answer', (answer, roomName) => {
    console.log(answer);
    socket.to(roomName).emit('answer', answer);
  });

  socket.on('ice', (ice, roomName) => {
    console.log(ice);
    socket.to(roomName).emit('ice', ice);
  });

  socket.on('trmt_pending', roomName => {
    socket.to(roomName).emit('trmt_pending');
  });

  socket.on('trmt_end', roomName => {
    socket.to(roomName).emit('trmt_end');
  });

  //* senser area
  socket.on('setup_senser', roomName => {
    socket.to(roomName).emit('setup_senser');
  });

  socket.on('temperature_start', roomName => {
    console.log('temp start at ', roomName);
    // socket.to(roomName).emit('temp_start');
    socket.to(roomName).emit('start', 'temp');
  });

  socket.on('temp_end', (roomName, data) => {
    console.log('result: ', data);
    socket.to(roomName).emit('temperature_end', data);
  });

  socket.on('bmp_start', roomName => {
    socket.to(roomName).emit('bmp_start');
  });

  socket.on('bmp_end', (roomName, data) => {
    console.log('result: ', data);
    socket.to(roomName).emit('bmp_end', data);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
