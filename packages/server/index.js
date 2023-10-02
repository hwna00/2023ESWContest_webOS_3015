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
app.use(cors({ origin: 'http://localhost:8080' }));

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

app.post('/api/user', createUser);
app.get('/api/users/:uid', readUser);
app.patch('/api/users/:uid', updateUser);
app.post('/api/appointment', createAppointment);

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

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
