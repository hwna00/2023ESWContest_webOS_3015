const pool = require('../../config/db');

const createVitalSignQuery = async (connection, data) => {
  let Query;
  switch (data.type) {
    case 'temperature':
      Query =
        'INSERT INTO Temperature(user_id, value, date, time) VALUES (?, ?, ?, ?);';
      break;
    case 'heartRate':
      Query =
        'INSERT INTO HeartRate(user_id, value, date, time) VALUES (?, ?, ?, ?);';
      break;
    default:
      throw Error('type not found');
  }

  const Params = [data.uid, data.value, data.date, data.time];

  await connection.query(Query, Params);
};

exports.createVitalSign = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createVitalSignQuery(connection, data);

      return res.json({
        result: data,
        isSuccess: true,
        code: 201,
        message: '활력징후 생성 성공',
      });
    } catch (err) {
      if (err.message === 'type not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '측정타입을 찾을 수 없습니다.',
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
