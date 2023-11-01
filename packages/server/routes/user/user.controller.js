const convertUser = require('../../utils/convertUser');
const classifyVitalSigns = require('../../utils/classifyVitalSigns');
const classifyAppointments = require('../../utils/classifyAppointments');
const pool = require('../../config/db');

const createUserQuery = async (connection, data) => {
  const Query =
    'INSERT INTO Users(user_id, name, email, phone_number, address, address_detail, second_phone_number, birthdate, bloodtype, height, weight, gender, regular_medicines, chronic_disease) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

  const Params = [
    data.uid,
    data.username,
    data.email,
    data.phoneNumber,
    data.address,
    data.addressDetail,
    data.secondPhoneNumber,
    data.birthDate,
    data.bloodType,
    data.height,
    data.weight,
    data.gender,
    data.regularMedicines,
    data.chronicDisease,
  ];

  await connection.query(Query, Params);
};

const createUserSideEffectsQuery = async (connection, data, uid) => {
  const Query =
    'INSERT INTO SideEffectHistories(user_id, expression, symptom, candidatePills) VALUES (?, ?, ?, ?);';

  const Params = [
    uid,
    data.expression,
    data.symptom,
    JSON.stringify(data.candidatePills),
  ];

  await connection.query(Query, Params);
};

const readUserQuery = async (connection, uid) => {
  const Query = 'SELECT * FROM Users WHERE user_id = ?;';
  const Params = [uid];

  const rows = await connection.query(Query, Params);

  return rows;
};

const updateUserQuery = async (connection, uid, data) => {
  const Query = `UPDATE Users SET name = ifnull(?, name), email = ifnull(?, email),
        phone_number = ifnull(?, phone_number), address = ifnull(?, address),
          address_detail = ifnull(?, address_detail), second_phone_number = ifnull(?, second_phone_number),
            birthdate = ifnull(?, birthdate), bloodtype = ifnull(?, bloodtype), height = ifnull(?, height),
              weight = ifnull(?, weight), gender = ifnull(?, gender), regular_medicines = ifnull(?, regular_medicines),
                chronic_disease = ifnull(?, chronic_disease) WHERE user_id = ?;`;

  const Params = [
    data.username,
    data.email,
    data.phoneNumber,
    data.address,
    data.addressDetail,
    data.secondPhoneNumber,
    data.birthDate,
    data.bloodType,
    data.height,
    data.weight,
    data.gender,
    data.regularMedicines,
    data.chronicDisease,
    uid,
  ];

  await connection.query(Query, Params);
};

const readUserAppointmentsQuery = async (connection, uid) => {
  const Query = `SELECT id, H.doctor_id AS doctorId, H.doctor_name AS doctorName, H.hospital_id AS hospitalId, 
      H.hospital_name AS hospitalName, A.state_id AS stateId, A.NFTF_id AS NFTFId, A.date AS date, 
        A.time time, A.message AS message, A.is_NFTF AS isNFTF, A.rejection_reason AS rejectionReason 
    FROM Appointments A JOIN HospitalAffiliations H USING(doctor_id) 
    WHERE A.user_id = ? AND A.state_id IN ("aw","ac","ar");`;
  const Params = [uid, uid];

  const rows = await connection.query(Query, Params);

  return rows;
};

const readUserDiagnosesQuery = async (connection, uid) => {
  const Query = `SELECT DR.appointment_id AS id, A.date, H.hospital_name AS hospitalName, DR.pharmacy_name AS pharmacyName, DR.payment FROM DiagnosisRecords DR 
      JOIN Appointments A ON DR.appointment_id = A.id AND A.user_id = ? 
        JOIN Doctors D USING(doctor_id) JOIN HospitalName H USING(hospital_id)`;
  const Params = [uid];

  const rows = await connection.query(Query, Params);

  return rows;
};

const readUserMedecinesQuery = async (connection, uid, day) => {
  const selectAllMedecinesQuery = `SELECT medecine_id AS id, user_id AS uid, name AS medecineName, ifnull(intake_days, JSON_ARRAY()) AS intakeDays, ifnull(intake_times, JSON_ARRAY()) AS intakeTimes 
  FROM Medecines WHERE user_id = ?;`;
  const selectMedecinesByDayQuery = `SELECT medecine_id AS id, user_id AS uid, name AS medecineName, ifnull(intake_times, JSON_ARRAY()) AS intakeTimes 
  FROM Medecines WHERE user_id = ? AND JSON_CONTAINS(intake_days, JSON_QUOTE(?));`;
  const Params = [uid, day];

  const Query = !day ? selectAllMedecinesQuery : selectMedecinesByDayQuery;

  const rows = await connection.query(Query, Params);

  return rows;
};

const readUservitalSignsQuery = async (connection, uid, type) => {
  let Query;
  switch (type) {
    case 'temperature':
      Query =
        'SELECT id, value, date, time FROM Temperature WHERE user_id = ?;';
      break;
    case 'heartRate':
      Query = 'SELECT id, value, date, time FROM HeartRate WHERE user_id = ?;';
      break;
    default:
      Query = `WITH CTE_HeartRate AS (
        SELECT 'heartRate' AS type, id, value, date, time 
        FROM HeartRate 
        WHERE user_id =?
        ),
        CTE_Temperature AS (
        SELECT 'temperature' AS type, id, value, date, time 
        FROM Temperature 
        WHERE user_id = ?
        )
    
        SELECT * FROM CTE_HeartRate
        UNION
        SELECT * FROM CTE_Temperature
        ORDER BY date, time;`;
  }
  const Params = [uid, uid];

  const rows = await connection.query(Query, Params);

  return rows;
};

const readUserRecentVitalSignsQuery = async (connection, uid) => {
  const Query = `WITH CTE_HeartRate AS (
        SELECT 'heart-rate' AS type, "심박수" AS name, id, value, date, time 
        FROM HeartRate 
        WHERE user_id =?
        ORDER BY date DESC, time DESC
        LIMIT 1
        ),
        CTE_Temperature AS (
        SELECT 'temperature' AS type, "체온" AS name, id, value, date, time 
        FROM Temperature 
        WHERE user_id = ?
        ORDER BY date DESC, time DESC
        LIMIT 1
        )
    
        SELECT * FROM CTE_HeartRate
        UNION
        SELECT * FROM CTE_Temperature;`;

  const Params = [uid, uid];

  const rows = await connection.query(Query, Params);

  return rows;
};

const readUserFavoritesQuery = async (connection, uid, type) => {
  let Query;
  switch (type) {
    case 'doctor':
      Query =
        'SELECT doctor_id AS id FROM DoctorBookmarks WHERE user_id = ?;';
      break;
    case 'hospital':
      Query = 'SELECT hospital_id AS id FROM HospitalBookmarks WHERE user_id = ?;';
      break;
    default:
      Query = `
        SELECT 'doctor' AS type, doctor_id AS id FROM DoctorBookmarks WHERE user_id =?
        UNION
        SELECT 'hospital' AS type, hospital_id AS id FROM HospitalBookmarks WHERE user_id =?`;
  }
  const Params = [uid, uid];

  const rows = await connection.query(Query, Params);

  return rows;
};

const readUserSideEffectsQuery = async (connection, uid) => {
  const Query = 'SELECT id, expression, symptom, candidatePills FROM SideEffectHistories WHERE user_id = ?';
  const Params = [uid];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.createUser = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createUserQuery(connection, data);

      return res.json({
        result: data,
        isSuccess: true,
        code: 201,
        message: '유저 생성 성공',
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

exports.createUserSideEffects = async (req, res) => {
  const { data } = req.body;
  const { uid } = req.params;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createUserSideEffectsQuery(connection, data, uid);

      return res.json({
        result: data,
        isSuccess: true,
        code: 201,
        message: '부작용기록 생성 성공',
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

exports.readUser = async (req, res) => {
  const { uid } = req.params;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readUserQuery(connection, uid);
      if (rows.length === 0) {
        throw Error('User not found');
      } else {
        return res.json({
          result: convertUser.convertFromDB(rows[0]),
          isSuccess: true,
          code: 200,
          message: '유저 조회 성공',
        });
      }
    } catch (err) {
      if (err.message === 'User not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '유저를 찾을 수 없습니다.',
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

exports.updateUser = async (req, res) => {
  const { uid } = req.params;
  const { data } = req.body;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await updateUserQuery(connection, uid, data);

      return res.json({
        isSuccess: true,
        code: 204,
        message: '유저 업데이트 성공',
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

exports.readUserAppointments = async (req, res) => {
  const { uid } = req.params;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readUserAppointmentsQuery(connection, uid);

      const classifiedRows = classifyAppointments(rows);
      const { aw, ac, ar } = classifiedRows;
      return res.json({
        result: { aw, ac, ar },
        isSuccess: true,
        code: 200,
        message: '유저 예약정보 조회 성공',
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

exports.readUserDiagnoses = async (req, res) => {
  const { uid } = req.params;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readUserDiagnosesQuery(connection, uid);

      return res.json({
        result: rows,
        isSuccess: true,
        code: 200,
        message: '유저 진료기록 조회 성공',
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

exports.readUserMedecines = async (req, res) => {
  const { uid } = req.params;
  const { day } = req.query;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readUserMedecinesQuery(connection, uid, day);
      rows.forEach(medecine => {
        medecine.intakeTimes.sort();
      });
      return res.json({
        result: rows,
        isSuccess: true,
        code: 200,
        message: '복약정보 조회 성공',
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

exports.readUserVitalSigns = async (req, res) => {
  const { uid } = req.params;
  const { type } = req.query;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readUservitalSignsQuery(connection, uid, type);
      if (!type) {
        const classifiedRows = classifyVitalSigns(rows);
        return res.json({
          result: classifiedRows,
          isSuccess: true,
          code: 200,
          message: '활력징후 조회 성공',
        });
      }
      return res.json({
        result: rows,
        isSuccess: true,
        code: 200,
        message: '활력징후 조회 성공',
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

exports.readUserRecentVitalSigns = async (req, res) => {
  const { uid } = req.params;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readUserRecentVitalSignsQuery(connection, uid);

      return res.json({
        result: rows,
        isSuccess: true,
        code: 200,
        message: '활력징후 조회 성공',
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

exports.readUserFavorites = async (req, res) => {
  const { uid } = req.params;
  const { type } = req.query;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readUserFavoritesQuery(connection, uid, type);
      if (!type) {
        return res.json({
          result: rows,
          isSuccess: true,
          code: 200,
          message: '즐겨찾기 조회 성공',
        });
      }
      const favoriteArray = rows.map(favorite => favorite.id);
      return res.json({
        result: favoriteArray,
        isSuccess: true,
        code: 200,
        message: '즐겨찾기 조회 성공',
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

exports.readUserSideEffects = async (req, res) => {
  const { uid } = req.params;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [rows] = await readUserSideEffectsQuery(connection, uid);

      return res.json({
        result: rows,
        isSuccess: true,
        code: 200,
        message: '부작용 정보 조회 성공',
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
