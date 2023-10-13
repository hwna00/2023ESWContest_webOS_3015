const pool = require('../../config/db');

const createDiagnosisQuery = async (connection, data) => {
  const Query =
    'INSERT INTO DiagnosisRecords(appointment_id, content) VALUES (?, ?);';
  const Params = [data.appointmentId, data.content];

  await connection.query(Query, Params);
};

exports.createDiagnosis = async (req, res) => {
  const { data } = req.body;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createDiagnosisQuery(connection, data);

      return res.json({
        result: data,
        isSuccess: true,
        code: 201,
        message: '진료 코멘트 생성 성공',
      });
    } catch (err) {
      let response;
      switch (err.errno) {
        case 1062:
          response = res.json({
            isSuccess: false,
            code: 409,
            message: '이미 생성된 진료기록입니다.',
          });
          break;
        case 1452:
          response = res.json({
            isSuccess: false,
            code: 400,
            message: '없는 예약 정보입니다.',
          });
          break;
        default:
          response = res.json({
            isSuccess: false,
            code: 500,
            message: '서버 오류',
          });
      }
      return response;
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
