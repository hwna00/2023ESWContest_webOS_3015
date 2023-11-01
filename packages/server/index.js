const http = require('http');

const SocketIO = require('socket.io');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const vitalSign = require('./routes/vitalSign/vitalSign');
const user = require('./routes/user/user');
const review = require('./routes/review/review');
const medicine = require('./routes/medicine/medicine');
const hospital = require('./routes/hospital/hospital');
const favorite = require('./routes/favorite/favorite');
const emergency = require('./routes/emergency/emergency');
const doctor = require('./routes/doctor/doctor');
const diagnosis = require('./routes/diagnosis/diagnosis');
const counselor = require('./routes/counselor/counselor');
const auth = require('./routes/auth/auth');
const appointment = require('./routes/appointment/appointment');
const { executeQueries } = require('./config/dialogflowAgent');

require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer, {
  cors: { origin: '*' },
});

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
app.use('/api', medicine);
app.use('/api', vitalSign);
app.use('/api', favorite);

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

app.post('/api/dialogflow', async (req, res) => {
  console.log('body', req.body);
  const { symptom } = req.body;
  const result = await executeQueries('123123', [symptom]);
  res.json(result);
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

  socket.on('trmt_start', (roomName, id) => {
    console.log('trmt_start: ', id);
    socket.to(roomName).emit('trmt_start', id);
  });

  socket.on('trmt_pending', roomName => {
    console.log('trmt_pending');
    socket.to(roomName).emit('trmt_pending');
  });

  socket.on('trmt_end', roomName => {
    socket.to(roomName).emit('trmt_end');
  });

  //* senser area
  socket.on('setup_senser', roomName => {
    socket.to(roomName).emit('setup_senser');
  });

  socket.on('measure_start', roomName => {
    socket.to(roomName).emit('temperature_start');
  });

  socket.on('temperature_start', (roomName, time) => {
    socket.to(roomName).emit('temperature_start', time);
  });

  socket.on('temperature_end', (roomName, data) => {
    console.log('result: ', data);
    socket.to(roomName).emit('temperature_end', data);
  });

  socket.on('bpm_start', roomName => {
    socket.to(roomName).emit('bpm_start');
  });

  socket.on('bpm_end', (roomName, data) => {
    console.log('result: ', data);
    socket.to(roomName).emit('bpm_end', data);
  });

  //* senser area
  socket.on('emergency_call', (centerid, uid) => {
    console.log('emergency_call');
    socket.to(centerid).emit('emergency_call', uid);
  });

  socket.on('emergency_ready', (roomName, emergencyId) => {
    console.log('emergency_ready');
    socket.to(roomName).emit('emergency_ready', emergencyId);
  });

  socket.on('emergency_end', roomName => {
    console.log('emergency_end');
    socket.to(roomName).emit('emergency_end');
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`Server on port: ${port}`);
});

//* emergency area
