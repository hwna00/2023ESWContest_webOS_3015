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

const insertUsers = async function (
  connection,
  id,
  name,
  email,
  mobile,
  birthyear,
  birthday,
  gender,
  profile_image,
) {
  const createUserQuery = `INSERT INTO Users (user_id, name, email, phone_number, address, address_detail, birthdate, gender, profile_img) VALUES (?, ?, ?, ?, '', '', ?, ?, ?);`;
  const Params = [
    id,
    name,
    email,
    mobile,
    birthyear + '-' + birthday,
    gender,
    profile_image,
  ];

  await connection.query(createUserQuery, Params);
};

const createUsers = async function (req, res) {
  const {
    id,
    name,
    email,
    mobile,
    birthyear,
    birthday,
    gender,
    profile_image,
  } = req.body;

  if (
    typeof id !== 'string' ||
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof mobile !== 'string' ||
    typeof gender !== 'string' ||
    typeof profile_image !== 'string'
  ) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: '문자열을 입력해주세요.',
    });
  }

  var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  if (!regex.test(birthyear + '-' + birthday)) {
    return res.send({
      isSucess: false,
      code: 400,
      message: '날짜 형식을 제대로 입력해주세요.',
    });
  }

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await insertUsers(
        connection,
        id,
        name,
        email,
        mobile,
        birthyear,
        birthday,
        gender,
        profile_image,
      );

      return res.send({
        isSucess: true,
        code: 201,
        message: '유저 생성 성공',
      });
    } catch (err) {
      //이메일 중복이 발생하는 등의 에러
      if (err.errno === 1062) {
        return res.send({
          isSucess: false,
          code: 409,
          message: '이미 가입된 회원입니다.',
        });
      } else {
        return res.send({
          isSuccess: false,
          code: 500,
          message: '서버 오류',
        });
      }
    } finally {
      connection.release();
    }
  } catch (err) {
    return res.send({
      isSucess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

const selectUsers = async function (connection, uid) {
  const selectUserQuery = `SELECT * FROM Users WHERE user_id = ?;`;
  const Params = [uid];

  const rows = await connection.query(selectUserQuery, Params);

  return rows;
};

const readUsers = async function (req, res) {
  const { uid } = req.query;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await selectUsers(connection, uid);
      if (rows.length === 0) {
        throw Error('User not found');
      } else {
        return res.send({
          result: rows,
          isSucess: true,
          code: 200,
          message: '유저 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'User not found') {
        return res.send({
          isSucess: false,
          code: 404,
          message: '유저를 찾을 수 없습니다.',
        });
      } else {
        return res.send({
          isSuccess: false,
          code: 500,
          message: '서버 오류',
        });
      }
    } finally {
      connection.release();
    }
  } catch (err) {
    return res.send({
      isSucess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

app.post('/api/create-user', createUsers);

app.get('/api/read-user', readUsers);

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

app.get('/api/users/me', (req, res) => {
  console.log('me');
  //TODO: DB로부터 사용자 정보 검색
  res.json({
    name: '하철환',
    // profileImg: getUserImage(email),
  });
});

app.patch('/api/users/me', (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
