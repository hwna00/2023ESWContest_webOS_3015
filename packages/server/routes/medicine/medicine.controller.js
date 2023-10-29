const pool = require('../../config/db');

const createMedicineQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Medecines(user_id, name, intake_days, intake_times) VALUES (?, ?, ?, ?);';

  const Params = [
    data.uid,
    data.medicineName,
    JSON.stringify(data.intakeDays),
    JSON.stringify(data.intakeTimes),
  ];

  await connection.query(Query, Params);
};

exports.createMedicine = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createMedicineQuery(connection, data);

      return res.json({
        result: data,
        isSuccess: true,
        code: 201,
        message: '약물 생성 성공',
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
