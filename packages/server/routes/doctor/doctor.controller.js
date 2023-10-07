const pool = require('../../config/db');

exports.createDoctorQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Doctors(doctor_id, hospital_id, name, email, fields, specialty, description) VALUES (?, ?, ?, ?, ?, ?, ?);';

  const Params = [
    data.doctorId,
    data.hospitalId,
    data.username,
    data.email,
    data.fields,
    data.specialty,
    data.description,
  ];

  await connection.query(Query, Params);
};

exports.createDoctor = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await exports.createDoctorQuery(connection, data);

      return res.json({
        hospital: data,
        isSuccess: true,
        code: 201,
        message: '의사 생성 성공',
      });
    } catch (err) {
      let response;
      switch (err.errno) {
        case 1062:
          response = res.json({
            isSuccess: false,
            code: 409,
            message: '이미 가입된 회원입니다.',
          });
          break;
        case 1452:
          response = res.json({
            isSuccess: false,
            code: 400,
            message: '가입되지 않은 병원입니다.병원을 먼저 가입해주세요',
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
