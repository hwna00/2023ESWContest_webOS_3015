const express = require('express');
const cors = require('cors');
const axios = require('axios');
const pool = require('./config/db');

const {
  fbCreateCustomToken,
  getNaverAuthApiUri,
} = require('./controllers/authController');

require('dotenv').config();

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const createUserQuery = async function (connection, data) {
  const Query = `INSERT INTO Users(user_id, name, email, phone_number, address, address_detail, second_phone_number, birthdate, bloodtype, height, weight, gender, regular_medicines, chronic_disease) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  const Params = [
    data.uid,
    data.username,
    data.email,
    data.phoneNumber,
    data.address,
    data.addressDetail,
    data.secondPhoneNumber,
    data.birthDate,
    data.bloodType,
    data.height,
    data.weight,
    data.gender,
    data.regularMedicines,
    data.chronicDisease,
  ];

  await connection.query(Query, Params);
};

const createUser = async function (req, res) {
  const { data } = req.body;

  var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  if (!regex.test(data.birthDate)) {
    return res.json({
      isSucess: false,
      code: 400,
      message: '날짜 형식을 제대로 입력해주세요.',
    });
  }

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createUserQuery(connection, data);

      return res.json({
        isSucess: true,
        code: 201,
        message: '유저 생성 성공',
      });
    } catch (err) {
      if (err.errno === 1062) {
        return res.json({
          isSucess: false,
          code: 409,
          message: '이미 가입된 회원입니다.',
        });
      } else {
        return res.json({
          isSuccess: false,
          code: 500,
          message: '서버 오류',
        });
      }
    } finally {
      connection.release();
    }
  } catch (err) {
    return res.json({
      isSucess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

const readUserQuery = async function (connection, uid) {
  const Query = `SELECT * FROM Users WHERE user_id = ?;`;
  const Params = [uid];

  const rows = await connection.query(Query, Params);

  return rows;
};

const readUser = async function (req, res) {
  const { uid } = req.params;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readUserQuery(connection, uid);
      if (rows.length === 0) {
        throw Error('User not found');
      } else {
        return res.json({
          result: rows,
          isSucess: true,
          code: 200,
          message: '유저 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'User not found') {
        return res.json({
          isSucess: false,
          code: 404,
          message: '유저를 찾을 수 없습니다.',
        });
      } else {
        return res.json({
          isSuccess: false,
          code: 500,
          message: '서버 오류',
        });
      }
    } finally {
      connection.release();
    }
  } catch (err) {
    return res.json({
      isSucess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

const createAppointmentQuery = async function (connection, data) {
  const datetime = data.date + ' ' + data.time;
  let isNFTF = 1;
  if (data.type === 'ftf') {
    data.nftfId = null;
    isNFTF = 0;
  }

  const Query = `INSERT INTO Appointments(user_id, doctor_id, NFTF_id, datetime, message, is_NFTF) VALUES (?, ?, ?, ?, ?, ?);`;
  const Params = [
    data.uid,
    data.doctorId,
    data.nftfId,
    datetime,
    data.memo,
    isNFTF,
  ];

  await connection.query(Query, Params);
};

const createAppointment = async function (req, res) {
  const { data } = req.body;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createAppointmentQuery(connection, data);

      return res.json({
        isSucess: true,
        code: 201,
        message: '예약정보 생성 성공',
      });
    } catch (err) {
      console.log(err);
      return res.json({
        isSuccess: false,
        code: 500,
        message: '서버 오류',
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return res.json({
      isSucess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

const updateUserQuery = async function (connection, uid, data) {
  const Query = `UPDATE Users SET name = ifnull(?, name), email = ifnull(?, email),
    phone_number = ifnull(?, phone_number), address = ifnull(?, address),
      address_detail = ifnull(?, address_detail), second_phone_number = ifnull(?, second_phone_number),
        birthdate = ifnull(?, birthdate), bloodtype = ifnull(?, bloodtype), height = ifnull(?, height),
        weight = ifnull(?, weight), gender = ifnull(?, gender), regular_medicines = ifnull(?, regular_medicines),
          chronic_disease = ifnull(?, chronic_disease) WHERE user_id = ?;`;

  const Params = [
    data.username,
    data.email,
    data.phoneNumber,
    data.address,
    data.addressDetail,
    data.secondPhoneNumber,
    data.birthDate,
    data.bloodType,
    data.height,
    data.weight,
    data.gender,
    data.regularMedicines,
    data.chronicDisease,
    uid,
  ];

  await connection.query(Query, Params);
};

const updateUser = async function (req, res) {
  const { uid } = req.params;
  const { data } = req.body;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await updateUserQuery(connection, uid, data);

      return res.json({
        isSucess: true,
        code: 204,
        message: '유저 업데이트 성공',
      });
    } catch (err) {
      console.log(err);
      return res.json({
        isSuccess: false,
        code: 500,
        message: '서버 오류',
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return res.json({
      isSucess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

const readUserAppointmentQuery = async function (connection, id) {
  const Query = `SELECT * FROM Housepital.Users join Housepital.Appointments using(user_id) where id = ?;`;
  const Params = [id];

  const rows = await connection.query(Query, Params);

  return rows;
};

const readUserAppointment = async function (req, res) {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readUserAppointmentQuery(connection, id);
      if (rows.length === 0) {
        throw Error('Appointment not found');
      } else {
        return res.json({
          result: rows,
          isSucess: true,
          code: 200,
          message: '유저 예약정보 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'Appointment not found') {
        return res.json({
          isSucess: false,
          code: 404,
          message: '예약정보를 찾을 수 없습니다.',
        });
      } else {
        return res.json({
          isSuccess: false,
          code: 500,
          message: '서버 오류',
        });
      }
    } finally {
      connection.release();
    }
  } catch (err) {
    return res.json({
      isSucess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

const readAppointmentsQuery = async function (connection, id) {
  const Query = `SELECT * FROM Housepital.Appointments WHERE doctor_id in (select doctor_id from Housepital.Doctors where hospital_id = ?);`;
  Params = [id];

  const rows = await connection.query(Query, Params);

  return rows;
};

const classifyAppointments = function (rows) {
  const result = { aw: [], ac: [], dc: [], pc: [], ar: [] };

  for (let i = 0; i < rows.length; i++) {
    switch (rows[i].state_id) {
      case 'aw':
        result.aw.push(rows[i]);
        break;
      case 'ac':
        result.ac.push(rows[i]);
        break;
      case 'dc':
        result.dc.push(rows[i]);
        break;
      case 'pc':
        result.pc.push(rows[i]);
        break;
      case 'ar':
        result.ar.push(rows[i]);
        break;
    }
  }

  return result;
};

const readAppointments = async function (req, res) {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readAppointmentsQuery(connection, id);
      const classifiedRows = classifyAppointments(rows);

      if (rows.length === 0) {
        throw Error('Appointments not found');
      } else {
        return res.json({
          result: classifiedRows,
          isSucess: true,
          code: 200,
          message: '예약정보 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'Appointments not found') {
        return res.json({
          isSucess: false,
          code: 404,
          message: '예약정보를 찾을 수 없습니다.',
        });
      } else {
        return res.json({
          isSuccess: false,
          code: 500,
          message: '서버 오류',
        });
      }
    } finally {
      connection.release();
    }
  } catch (err) {
    return res.json({
      isSucess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

const updateAppointmentQuery = async function (connection, id, data) {
  const Query = `UPDATE Appointments SET state_id = ifnull(?, state_id), rejection_reason = ifnull(?, rejection_reason) WHERE id = ?;`;
  const Params = [data.stateId, data.rejectionReason, id];

  await connection.query(Query, Params);
};

const updateAppointment = async function (req, res) {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await updateAppointmentQuery(connection, id, data);

      return res.json({
        isSucess: true,
        code: 204,
        message: '예약정보 업데이트 성공',
      });
    } catch (err) {
      console.log(err);
      return res.json({
        isSuccess: false,
        code: 500,
        message: '서버 오류',
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return res.json({
      isSucess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

app.post('/api/users', createUser);
app.get('/api/users/:uid', readUser);
app.get('/api/appointments/:id', readUserAppointment);
app.patch('/api/users/:uid', updateUser);
app.post('/api/appointments', createAppointment);
app.get('/api/hospitals/:id/appointments', readAppointments);
app.patch('/api/appointments/:id', updateAppointment);

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
  } catch {
    //TODO: email 중복이 발생할 경우 DB에 정보를 저장하지 않음
  } finally {
    fbCreateCustomToken(user.id)
      .then(token => {
        res
          .cookie('token', token)
          .redirect(`http://localhost:8080/auth/callback`);
      })
      .catch(err => console.log(err));
  }
});

app.get('/api/users/:uid', (req, res) => {
  //TODO: DB로부터 사용자 정보 검색
  res.json({
    name: '하철환',
    // profileImg: getUserImage(email),
  });
});

app.patch('/api/users/me', (req, res) => {
  console.log(req.body);
});

app.get('/api/hospitals', (req, res) => {
  res.json([
    {
      id: '0',
      isFavorite: true,
      name: '연세 새로운 내과',
      fields: ['내과', '가정의학과'],
      rate: '4.8',
      profileImg: 'https://cdn-icons-png.flaticon.com/512/6743/6743757.png',
      distance: '1.2km',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
      doctors: [
        {
          id: '0',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
        {
          id: '1',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
      ],
      reviews: [
        {
          id: 0,
          reviewer: '양지웅',
          reviewee: '김재인',
          rate: '4.5',
          content: '의사 선생님이 약간 불친절해요',
        },
        {
          id: 1,
          reviewer: '송보경',
          reviewee: '양지웅',
          rate: '4.5',
          content: '의사 선생님이 친절해요',
        },
      ],
    },
    {
      id: '1',
      name: '정형 튼튼 정형외과',
      isFavorite: true,
      fields: ['정형외과'],
      rate: '4.6',
      profileImg: 'https://cdn-icons-png.flaticon.com/512/6743/6743757.png',
      distance: '1.7km',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
      doctors: [
        {
          id: '0',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
        {
          id: '1',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
      ],
    },
    {
      id: '2',
      name: '신촌 깔끔 이비인후과',
      isFavorite: true,
      fields: ['이비인후과', '내과'],
      rate: '4.5',
      profileImg: 'https://cdn-icons-png.flaticon.com/512/6743/6743757.png',
      distance: '2.1km',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
      doctors: [
        {
          id: '0',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
        {
          id: '1',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
      ],
    },
    {
      id: '3',
      name: '잠실 재활의학과',
      isFavorite: true,
      fields: ['재활의학과', '정형외과'],
      rate: '4.5',
      profileImg: 'https://cdn-icons-png.flaticon.com/512/6743/6743757.png',
      distance: '0.7km',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
      doctors: [
        {
          id: '0',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
        {
          id: '1',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
      ],
    },
    {
      id: '4',
      name: '합정 우리 의원',
      isFavorite: true,
      fields: ['가정의학과', '내과'],
      rate: '4.9',
      profileImg: 'https://cdn-icons-png.flaticon.com/512/6743/6743757.png',
      distance: '1.2km',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
      doctors: [
        {
          id: '0',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
        {
          id: '1',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
      ],
    },
    {
      id: '5',
      name: '강남 신소재 성형외과',
      isFavorite: true,
      fields: ['성형외과'],
      rate: '4.9',
      profileImg: 'https://cdn-icons-png.flaticon.com/512/6743/6743757.png',
      distance: '3.7km',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
      doctors: [
        {
          id: '0',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
        {
          id: '1',
          name: '이현철',
          specialty: '내과 전문의',
          fields: ['내과', '가정의학과'],
          rate: '4.4',
          profileImg:
            'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
        },
      ],
    },
  ]);
});

app.get('/api/doctors', (req, res) => {
  res.json([
    {
      id: '0',
      name: '이현철',
      specialty: '내과 전문의',
      fields: ['내과', '가정의학과'],
      rate: '4.4',
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
      isFavorite: true,
      hospital: '연세 새로운 내과',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
      reviews: [
        {
          id: 0,
          reviewer: '양지웅',
          reviewee: '김재인',
          rate: '4.5',
          content: '의사 선생님이 약간 불친절해요',
        },
        {
          id: 1,
          reviewer: '송보경',
          reviewee: '양지웅',
          rate: '4.5',
          content: '의사 선생님이 친절해요',
        },
      ],
    },
    {
      id: '1',
      name: '이현철',
      specialty: '내과 전문의',
      fields: ['내과', '가정의학과'],
      rate: '4.4',
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
      isFavorite: true,
      hospital: '연세 새로운 내과',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
    },
    {
      id: '2',
      name: '양지웅',
      specialty: '안과 전문의',
      fields: ['안과'],
      rate: '4.8',
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
      isFavorite: true,
      hospital: '연세 새로운 내과',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
    },
    {
      id: '3',
      name: '김재인',
      specialty: '내과 전문의',
      fields: ['내과'],
      rate: '5.0',
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
      isFavorite: false,
      hospital: '연세 새로운 내과',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
    },
    {
      id: '4',
      name: '서진형',
      specialty: '가정의학과 전문의',
      fields: ['가정의학과'],
      rate: '4.9',
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
      isFavorite: false,
      hospital: '연세 새로운 내과',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
    },
    {
      id: '5',
      name: '송보경',
      specialty: '이비인후과 전문의',
      fields: ['이비인후과'],
      rate: '4.5',
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
      isFavorite: true,
      hospital: '연세 새로운 내과',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
    },
    {
      id: '6',
      name: '홍길동',
      specialty: '소아과 전문의',
      fields: ['소아과', '내과'],
      rate: '4.7',
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
      isFavorite: true,
      hospital: '연세 새로운 내과',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
    },
    {
      id: '7',
      name: '콩쥐',
      specialty: '가정의학과 전문의',
      fields: ['가정의학과'],
      rate: '4.9',
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
      isFavorite: false,
      hospital: '연세 새로운 내과',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
    },
    {
      id: '8',
      name: '팥쥐',
      specialty: '이비인후과 전문의',
      fields: ['이비인후과'],
      rate: '4.5',
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
      isFavorite: false,
      hospital: '연세 새로운 내과',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
    },
    {
      id: '9',
      name: '하철환',
      specialty: '소아과 전문의',
      fields: ['소아과', '내과'],
      rate: '4.7',
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
      isFavorite: true,
      hospital: '연세 새로운 내과',
      tel: '031-123-1234',
      address: '서울시 어쩌구 이러면',
      businessHours: {
        monday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        tuesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        wednesday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        thursday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        friday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        saturday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
        sunday: {
          open: '09:00 ~ 18:00',
          break: '13:00 ~ 14:00',
        },
      },
    },
  ]);
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
