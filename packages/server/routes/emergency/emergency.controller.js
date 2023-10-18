const pool = require('../../config/db');

const createEmergencyQuery = async (connection, data) => {
  const Query = 'INSERT INTO Emergencies(counselor_id, user_id) VALUES (?, ?);';

  const Params = [data.counselorId, data.uid];

  await connection.query(Query, Params);
};

exports.createEmergency = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createEmergencyQuery(connection, data);

      return res.json({
        result: data,
        isSuccess: true,
        code: 201,
        message: '응급신고 생성 성공',
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
