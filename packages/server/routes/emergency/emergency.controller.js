const convertEmergency = require('../../utils/convertEmergency');
const pool = require('../../config/db');

const createEmergencyQuery = async (connection, data) => {
  const Query = 'INSERT INTO Emergencies(counselor_id, user_id) VALUES (?, ?);';

  const Params = [data.counselorId, data.uid];

  await connection.query(Query, Params);
};

const readEmergencyQuery = async (connection, emergencyId) => {
  const Query =
    'SELECT * FROM Emergencies E JOIN Users U USING(user_id) WHERE E.id = ?;';

  const Params = [emergencyId];

  const rows = await connection.query(Query, Params);

  return rows;
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

exports.readEmergency = async (req, res) => {
  const { emergencyId } = req.params;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readEmergencyQuery(connection, emergencyId);

      return res.json({
        result: convertEmergency.convert(rows[0]),
        isSuccess: true,
        code: 200,
        message: '신고정보 조회 성공',
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
