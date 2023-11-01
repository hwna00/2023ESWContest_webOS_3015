const pool = require('../../config/db');

const createFavoriteQuery = async (connection, data) => {
  let Query; let
    id;
  switch (data.type) {
    case 'doctor':
      Query =
          'INSERT INTO DoctorBookmarks(user_id, doctor_id) VALUES (?, ?);';
      id = data.doctorId;
      break;
    case 'hospital':
      Query =
          'INSERT INTO HospitalBookmarks(user_id, hospital_id) VALUES (?, ?);';
      id = data.hospitalId;
      break;
    default:
      throw Error('type not found');
  }

  const Params = [data.uid, id];

  await connection.query(Query, Params);
};

const deleteFavoriteQuery = async (connection, data, type) => {
  const Query = (type === 'doctor') ? 'DELETE FROM DoctorBookmarks WHERE user_id = ? AND doctor_id = ?;' : 'DELETE FROM HospitalBookmarks WHERE user_id = ? AND hospital_id = ?;';
  const Params = [data.uid, data.targetId];

  const deleteData = await connection.query(Query, Params);

  return deleteData;
};

exports.createFavorite = async (req, res) => {
  const { data } = req.body;
  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      await createFavoriteQuery(connection, data);

      return res.json({
        result: data,
        isSuccess: true,
        code: 201,
        message: '즐겨찾기 생성 성공',
      });
    } catch (err) {
      if (err.message === 'type not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '즐겨찾기 타입을 찾을 수 없습니다.',
        });
      }

      if (err.errno === 1062) {
        return res.json({
          isSuccess: false,
          code: 409,
          message: '이미 생성된 즐겨찾기입니다.',
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

exports.deleteFavorite = async (req, res) => {
  const { data } = req.body;
  const { type } = req.query;

  try {
    const connection = await pool.getConnection(async conn => conn);
    try {
      const [deleteData] = await deleteFavoriteQuery(
        connection,
        data,
        type,
      );
      if (deleteData.affectedRows === 0) {
        throw Error('Favorite not found');
      } else {
        return res.json({
          isSuccess: true,
          code: 204,
          message: '즐겨찾기 삭제 완료',
        });
      }
    } catch (err) {
      if (err.message === 'Favorite not found') {
        return res.json({
          isSuccess: false,
          code: 404,
          message: '즐겨찾기를 찾을 수 없습니다.',
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
