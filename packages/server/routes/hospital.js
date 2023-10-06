const router = require('express').Router();

const convertHospital = require('../utils/convertHospital');
const pool = require('../config/db');

const readHospitalsQuery = async function (connection, name) {
  const selectAllHospitalsQuery = 'SELECT * FROM Hospitals;';
  const selectHospitalsByNameQuery = 'SELECT * FROM Hospitals WHERE name = ?;';
  const Params = [name];

  const Query = !name ? selectAllHospitalsQuery : selectHospitalsByNameQuery;

  const rows = await connection.query(Query, Params);

  return rows;
};

const readHospitals = async function (req, res) {
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

const createHospitalQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Hospitals(hospital_id, name, description, ykiho) VALUES (?, ?, ?, ?);';

  const Params = [data.hospitalId, data.name, data.description, data.ykiho];

  await connection.query(Query, Params);
};

const createHospital = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createHospitalQuery(connection, data);

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

const readAppointmentsQuery = async function (connection, hospitalId) {
  const Query =
    'SELECT * FROM Housepital.Appointments WHERE doctor_id in (select doctor_id from Housepital.Doctors where hospital_id = ?);';
  const Params = [hospitalId];
  const rows = await connection.query(Query, Params);

  return rows;
};

const classifyAppointments = function (rows) {
  const result = {
    aw: [],
    ac: [],
    dc: [],
    pc: [],
    ar: [],
  };

  for (let i = 0; i < rows.length; i += 1) {
    switch (rows[i].state_id) {
      case 'aw':
        result.aw.push(rows[i]);
        break;
      case 'ac':
        result.ac.push(rows[i]);
        break;
      case 'dc':
        result.dc.push(rows[i]);
        break;
      case 'pc':
        result.pc.push(rows[i]);
        break;
      case 'ar':
        result.ar.push(rows[i]);
        break;
      default:
        break;
    }
  }

  return result;
};

const readAppointments = async function (req, res) {
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
router.post('/hospitals', createHospital);
router.get('/hospitals', readHospitals);
router.get('/hospitals/:hospitalId/appointments', readAppointments);

module.exports = router;
