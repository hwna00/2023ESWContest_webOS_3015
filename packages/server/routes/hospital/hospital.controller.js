const convertHospital = require('../../utils/convertHospital');
const classifyAppointments = require('../../utils/classifyAppointments');
const pool = require('../../config/db');

const createHospitalsQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Hospitals(hospital_id, name, description, ykiho) VALUES (?, ?, ?, ?);';

  const Params = [data.hospitalId, data.name, data.description, data.ykiho];

  await connection.query(Query, Params);
};

const readHospitalsQuery = async function (connection, name) {
  const selectAllHospitalsQuery = 'SELECT * FROM Hospitals;';
  const selectHospitalsByNameQuery = 'SELECT * FROM Hospitals WHERE name = ?;';
  const Params = [name];

  const Query = !name ? selectAllHospitalsQuery : selectHospitalsByNameQuery;

  const rows = await connection.query(Query, Params);

  return rows;
};

const readHospitalQuery = async function (connection, hospitalId) {
  const Query = `SELECT
  hospital_id,
  H.name,
  H.ykiho,
  H.description,
  JSON_ARRAYAGG(
      if(doctor_id is not null, JSON_OBJECT(
          'id', D.doctor_id,
          'name', D.name,
          'specialty', D.specialty,
          'fields', D.fields,
          'rate', ifnull((SELECT rate FROM DoctorRate WHERE doctor_id = D.doctor_id), 0)
      ), null)) AS doctors
  FROM (SELECT * FROM Hospitals WHERE hospital_id = ?) H
  LEFT OUTER JOIN Doctors D USING(hospital_id);`;

  const Params = [hospitalId];

  const rows = await connection.query(Query, Params);

  return rows;
};

const readAppointmentsQuery = async function (connection, hospitalId) {
  const Query =
    'SELECT * FROM Housepital.Appointments WHERE doctor_id in (SELECT doctor_id FROM Housepital.Doctors WHERE hospital_id = ?);';
  const Params = [hospitalId];
  const rows = await connection.query(Query, Params);

  return rows;
};

exports.createHospital = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createHospitalsQuery(connection, data);

      return res.json({
        hospital: data,
        isSuccess: true,
        code: 201,
        message: '병원 생성 성공',
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

exports.readHospitals = async function (req, res) {
  const { name } = req.query;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readHospitalsQuery(connection, name);
      if (rows.length === 0) {
        throw Error('Hospital not found');
      } else {
        const hospitals = rows.map(row => convertHospital(row));
        return res.json({
          hospitals,
          isSuccess: true,
          code: 200,
          message: '병원 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'Hospital not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '병원을 찾을 수 없습니다.',
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

exports.readHospital = async function (req, res) {
  const { hospitalId } = req.params;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readHospitalQuery(connection, hospitalId);
      if (rows[0].hospital_id == null) {
        throw Error('Hospital not found');
      } else {
        if (rows[0].doctors[0] == null) {
          rows[0].doctors = [];
        }
        return res.json({
          result: rows[0],
          isSuccess: true,
          code: 200,
          message: '병원 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'Hospital not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '병원을 찾을 수 없습니다.',
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

exports.readAppointments = async function (req, res) {
  const { hospitalId } = req.params;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readAppointmentsQuery(connection, hospitalId);
      const classifiedRows = classifyAppointments(rows);

      if (rows.length === 0) {
        throw Error('Appointments not found');
      } else {
        return res.json({
          result: classifiedRows,
          isSuccess: true,
          code: 200,
          message: '예약정보 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'Appointments not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '예약정보를 찾을 수 없습니다.',
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