const router = require('express').Router();

const convertUser = require('../utils/convertUser');
const pool = require('../config/db');

const createUserQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Users(user_id, name, email, phone_number, address, address_detail, second_phone_number, birthdate, bloodtype, height, weight, gender, regular_medicines, chronic_disease) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

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

const createUser = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createUserQuery(connection, data);

      return res.json({
        user: data,
        isSuccess: true,
        code: 201,
        message: '유저 생성 성공',
      });
    } catch (err) {
      if (err.errno === 1062) {
        return res.json({
          isSuccess: false,
          code: 409,
          message: '이미 가입된 회원입니다.',
        });
      }
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
      isSuccess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

const readUserQuery = async function (connection, uid) {
  const Query = 'SELECT * FROM Users WHERE user_id = ?;';
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
          result: convertUser(rows[0]),
          isSuccess: true,
          code: 200,
          message: '유저 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'User not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '유저를 찾을 수 없습니다.',
        });
      }
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
      isSuccess: false,
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
        isSuccess: true,
        code: 204,
        message: '유저 업데이트 성공',
      });
    } catch (err) {
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
      isSuccess: false,
      code: 500,
      message: '데이터베이스 연결 실패',
    });
  }
};

router.post('/users', createUser);
router.get('/users/:uid', readUser);
router.patch('/users/:uid', updateUser);

module.exports = router;
