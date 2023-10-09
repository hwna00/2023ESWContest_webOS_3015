const pool = require('../../config/db');

const createDoctorQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Doctors(doctor_id, hospital_id, name, email, fields, specialty, description) VALUES (?, ?, ?, ?, ?, ?, ?);';

  const Params = [
    data.doctorId,
    data.hospitalId,
    data.username,
    data.email,
    JSON.stringify(data.fields),
    data.specialty,
    data.description,
  ];

  await connection.query(Query, Params);
};

const readDoctorQuery = async function (connection, doctorId) {
  const Query = `SELECT
  doctor_id id,
  D.name,
  H.ykiho,
  D.fields,
  D.specialty,
  D.description,
  ifnull(AVG(R.rate), 0) AS rate,
  JSON_ARRAYAGG(
      if(R.id is not null, JSON_OBJECT(
          'reviewId', R.id,
          'reviewer', R.reviewer,
          'reviewee', R.reviewee,
          'rate', R.rate,
          'content', R.content
      ), null)) AS reviews
  FROM (SELECT * FROM Doctors WHERE doctor_id = ?) D 
  JOIN Hospitals H USING(hospital_id) 
  LEFT OUTER JOIN ReviewRelationship R USING(doctor_id);`;

  const Params = [doctorId];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.createDoctor = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createDoctorQuery(connection, data);

      return res.json({
        result: data,
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
            message: '가입되지 않은 병원입니다.병원을 먼저 가입해주세요.',
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

exports.readDoctor = async function (req, res) {
  const { doctorId } = req.params;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readDoctorQuery(connection, doctorId);
      if (rows[0].doctor_id == null) {
        throw Error('Doctor not found');
      } else {
        if (rows[0].reviews[0] == null) {
          rows[0].reviews = [];
        }
        return res.json({
          result: rows[0],
          isSuccess: true,
          code: 200,
          message: '의사 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'Doctor not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '의사를 찾을 수 없습니다.',
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
