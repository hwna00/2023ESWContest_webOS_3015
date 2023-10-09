import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createUser = async user => {
  // TODO: checkPassword 제거하기
  const { data } = await instance.post('/users', { data: user });
  return data;
};

export const getMe = async uid => {
  const { data } = await instance.get(`/users/${uid}`);
  return data;
};

export const updateMe = async (uid, data) => {
  return await instance.patch(`/users/${uid}`, { data });
};

export const createAppointment = async data => {
  return await instance.post('/appointments', { data });
};

export const getAppointments = async uid => {
  //TODO: 아직 구현되지 않음
  return await instance.get(`/appointments/${uid}`);
};

export const getFavorites = async () => {
  try {
    const { data } = await instance.get('/favorites');
    return data.result;
  } catch (error) {
    throw new Error(error);
  }
};

export const getHospitals = async () => {
  try {
    const { data } = await instance.get('/hospitals');
    return data.result;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDoctors = async () => {
  try {
    const { data } = await instance.get('/doctors');
    return data.result;
  } catch (error) {
    throw new Error(error);
  }
};

export const getHospital = async hospitalId => {
  try {
    const { data } = await instance.get(`/hospitals/${hospitalId}`);
    return data.result;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDoctor = async doctorId => {
  try {
    const { data } = await instance.get(`/doctors/${doctorId}`);
    return { ...data.result, fields: JSON.parse(data?.result?.fields) };
  } catch (error) {
    throw new Error(error);
  }
};

export const getHospitalDtl = async ykiho => {
  const { data } = await axios.get(
    `http://apis.data.go.kr/B551182/MadmDtlInfoService2/getDtlInfo2`,
    {
      params: {
        serviceKey: process.env.REACT_APP_DATA_API_KEY,
        ykiho,
        type: 'json',
      },
    },
  );
  console.log(data);
  return data;
};
