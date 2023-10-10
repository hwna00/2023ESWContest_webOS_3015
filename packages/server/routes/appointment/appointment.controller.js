const convertAppointment = require('../../utils/convertAppointment');
const pool = require('../../config/db');

const createAppointmentQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Appointments(user_id, doctor_id, NFTF_id, date, time, message, is_NFTF) VALUES (?, ?, ?, ?, ?, ?, ?);';
  const Params = [
    data.uid,
    data.doctorId,
    data.type === 'ftf' ? null : data.nftfId,
    data.date,
    data.time,
    data.memo,
    data.type === 'ftf' ? 0 : 1,
  ];

  await connection.query(Query, Params);
};

const readAppointmentQuery = async (connection, appointmentId) => {
  const Query =
    'SELECT * FROM Users U JOIN Appointments A ON A.id = ? AND U.user_id = A.user_id;';

  const Params = [appointmentId];

  const rows = await connection.query(Query, Params);

  return rows;
};

const updateAppointmentQuery = async (connection, appointmentId, data) => {
  const Query =
    'UPDATE Appointments SET state_id = ifnull(?, state_id), rejection_reason = ifnull(?, rejection_reason) WHERE id = ?;';
  const Params = [data.stateId, data.rejectionReason, appointmentId];

  await connection.query(Query, Params);
};

exports.createAppointment = async (req, res) => {
  const { data } = req.body;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createAppointmentQuery(connection, data);

      return res.json({
        result: data,
        isSuccess: true,
        code: 201,
        message: '예약정보 생성 성공',
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

exports.readAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readAppointmentQuery(connection, appointmentId);
      if (rows.length === 0) {
        throw Error('Appointment not found');
      } else {
        return res.json({
          result: convertAppointment.convert(rows[0]),
          isSuccess: true,
          code: 200,
          message: '유저 예약정보 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'Appointment not found') {
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

exports.updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { data } = req.body;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await updateAppointmentQuery(connection, appointmentId, data);

      return res.json({
        isSuccess: true,
        code: 204,
        message: '예약정보 업데이트 성공',
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
