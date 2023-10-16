const pool = require('../../config/db');

const createDiagnosisQuery = async (connection, data) => {
  const Query =
    'INSERT INTO DiagnosisRecords(appointment_id, content) VALUES (?, ?);';
  const Params = [data.appointmentId, data.content];

  await connection.query(Query, Params);
};

const updateDiagnosisQuery = async (connection, appointmentId, data) => {
  const Query =
    'UPDATE DiagnosisRecords SET pharmacy_name = ifnull(?, pharmacy_name), pharmacy_ykiho = ifnull(?, pharmacy_ykiho), payment = ifnull(?, payment) WHERE appointment_id = ?;';

  const Params = [
    data.pharmacyName,
    data.pharmacyYkiho,
    data.payment,
    appointmentId,
  ];

  await connection.query(Query, Params);
};

const readDiagnosisQuery = async (connection, appointmentId) => {
  const Query = `SELECT A.date, HA.hospital_name AS hospitalName, HA.doctor_name AS doctorName, 
      DR.pharmacy_name AS pharmacyname, DR.payment 
    FROM DiagnosisRecords DR JOIN Appointments A ON DR.appointment_id = A.id JOIN HospitalAffiliations HA USING(doctor_id)
    WHERE DR.appointment_id = ?`;

  const Params = [appointmentId];

  const rows = await connection.query(Query, Params);

  return rows;
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

exports.updateDiagnosis = async (req, res) => {
  const { appointmentId } = req.params;
  const { data } = req.body;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await updateDiagnosisQuery(connection, appointmentId, data);

      return res.json({
        isSuccess: true,
        code: 204,
        message: '진료기록 업데이트 성공',
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

exports.readDiagnosis = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readDiagnosisQuery(connection, appointmentId);
      if (rows.length === 0) {
        throw Error('Diagnosis not found');
      }
      return res.json({
        result: rows[0],
        isSuccess: true,
        code: 200,
        message: '진료기록 조회 성공',
      });
    } catch (err) {
      if (err.message === 'Diagnosis not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '진료기록을 찾을 수 없습니다.',
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
