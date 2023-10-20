const pool = require('../../config/db');

const createCounselorQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Counselors(counselor_id, name, center_name) VALUES (?, ?, ?);';
  const Params = [data.counselorId, data.counselorName, data.centerName];

  await connection.query(Query, Params);
};

const readCounselorQuery = async (connection, counselorId) => {
  const Query =
    'SELECT counselor_id AS counselorId, name AS counselorName, center_name AS centerName FROM Counselors WHERE counselor_id = ?;';

  const Params = [counselorId];

  const rows = await connection.query(Query, Params);

  return rows;
};

const readCounselorEmergenciesQuery = async (
  connection,
  counselorId,
  isCompleted,
) => {
  const Query = `SELECT E.id, U.name, U.phone_number AS phoneNumber, U.birthdate AS birthDate, E.is_completed AS isCompleted FROM Emergencies E JOIN Users U USING(user_id) 
    WHERE E.counselor_id = ? AND E.is_completed = ifnull(?,0)
    ORDER BY E.created_at;`;
  const Params = [counselorId, isCompleted];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.createCounselor = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createCounselorQuery(connection, data);

      return res.json({
        result: data,
        isSuccess: true,
        code: 201,
        message: '상담원 생성 성공',
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

exports.readCounselor = async (req, res) => {
  const { counselorId } = req.params;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readCounselorQuery(connection, counselorId);
      if (rows.length === 0) {
        throw Error('Counselor not found');
      }
      return res.json({
        result: rows[0],
        isSuccess: true,
        code: 200,
        message: '상담원 조회 성공',
      });
    } catch (err) {
      if (err.message === 'Counselor not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '상담원을 찾을 수 없습니다.',
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

exports.readCounselorEmergencies = async (req, res) => {
  const { counselorId } = req.params;
  const { isCompleted } = req.query;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readCounselorEmergenciesQuery(
        connection,
        counselorId,
        isCompleted,
      );

      return res.json({
        result: rows,
        isSuccess: true,
        code: 200,
        message: '신고목록 조회 성공',
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
