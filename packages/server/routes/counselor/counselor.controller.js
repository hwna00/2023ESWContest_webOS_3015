const pool = require('../../config/db');

const createCounselorQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Counselors(counselor_id, name, center_name) VALUES (?, ?, ?);';
  const Params = [data.counselorId, data.counselorName, data.centerName];

  await connection.query(Query, Params);
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
        message: '상담사 생성 성공',
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
