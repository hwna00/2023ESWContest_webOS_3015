const pool = require('../../config/db');

const createReviewQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Reviews(user_id, doctor_id, content, rate) VALUES (?, ?, ?, ?);';
  const Params = [data.uid, data.doctorId, data.content, data.rate];

  const createData = await connection.query(Query, Params);

  return createData;
};

const linkReviewToDiagnosis = async (connection, appointmentId, data) => {
  const Query =
    'UPDATE DiagnosisRecords SET review_id = ? WHERE appointment_id = ?;';
  const Params = [data.reviewId, appointmentId];

  await connection.query(Query, Params);
};

exports.createReview = async (req, res) => {
  const { data } = req.body;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const createData = await createReviewQuery(connection, data);
      const createdId = createData[0].insertId;

      data.reviewId = createdId;
      await linkReviewToDiagnosis(connection, data.appointmentId, data);

      return res.json({
        result: data,
        isSuccess: true,
        code: 201,
        message: '리뷰 생성 성공',
      });
    } catch (err) {
      if (err.errno === 1452) {
        return res.json({
          isSuccess: false,
          code: 409,
          message: '환자 혹은 의사가 없습니다.',
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
