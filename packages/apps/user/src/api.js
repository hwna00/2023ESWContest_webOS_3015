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
  try {
    const { data } = await instance.get(`users/${uid}/appointments`);
    const { aw, ac } = await data.result;

    return [...aw, ...ac];
  } catch (error) {
    throw new Error(error);
  }
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
  if (ykiho === '') {
    return {};
  }
  const base = 'https://apis.data.go.kr/B551182/MadmDtlInfoService2';
  try {
    const { data: dtl } = await axios.get(`${base}/getDtlInfo2`, {
      params: {
        serviceKey: process.env.REACT_APP_DATA_DECODING_API_KEY,
        // ykiho,
        ykiho:
          'JDQ4MTYyMiM1MSMkMSMkMCMkODkkMzgxMzUxIzExIyQxIyQzIyQ3OSQyNjE4MzIjNDEjJDEjJDgjJDgz',
        type: 'json',
      },
    });

    // TODO: 병원의 진료과목을 가져오는 api 함수 분리하기
    const { data: dgsbjt } = await axios.get(`${base}/getDgsbjtInfo2`, {
      params: {
        serviceKey: process.env.REACT_APP_DATA_DECODING_API_KEY,
        // ykiho,
        ykiho:
          'JDQ4MTYyMiM1MSMkMSMkMCMkODkkMzgxMzUxIzExIyQxIyQzIyQ3OSQyNjE4MzIjNDEjJDEjJDgjJDgz',
        type: 'json',
      },
    });
    console.log(dtl.response.body.items.item);
    console.log(dgsbjt.response.body.items.item.map(field => field.dgsbjtCdNm));
    // return data;
  } catch (error) {
    throw new Error(error);
  }
};
