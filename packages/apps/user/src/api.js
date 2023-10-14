import axios from 'axios';
import { getTrmtHours } from './utils/converter';

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

export const deleteAppointment = async appointmentId => {
  const { data } = await instance.delete(`/appointments/${appointmentId}`);
  return data;
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

export const createReivew = async review => {
  const { data } = await instance.post('/reviews', { data: review });
  console.log(data);
};

export const getHospitalDtl = async ykiho => {
  const base = 'https://apis.data.go.kr/B551182/MadmDtlInfoService2';
  try {
    const { data: dtl } = await axios.get(`${base}/getDtlInfo2`, {
      params: {
        serviceKey: process.env.REACT_APP_DATA_DECODING_API_KEY,
        ykiho,
        type: 'json',
      },
    });

    const result = await getTrmtHours(dtl.response.body.items.item);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFields = async ({ queryKey }) => {
  const [_, ykiho] = queryKey;

  if (ykiho === '') {
    return {};
  }
  const base = 'https://apis.data.go.kr/B551182/MadmDtlInfoService2';
  try {
    const { data: dgsbjt } = await axios.get(`${base}/getDgsbjtInfo2`, {
      params: {
        serviceKey: process.env.REACT_APP_DATA_DECODING_API_KEY,
        // ykiho,
        ykiho:
          'JDQ4MTYyMiM1MSMkMSMkMCMkODkkMzgxMzUxIzExIyQxIyQzIyQ3OSQyNjE4MzIjNDEjJDEjJDgjJDgz',
        type: 'json',
      },
    });
    return dgsbjt.response.body.items.item;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPharmacies = async ({ pageNo, numOfRows }) => {
  const base =
    'https://apis.data.go.kr/B551182/pharmacyInfoService/getParmacyBasisList';
  const { data } = await axios.get(`${base}`, {
    params: {
      serviceKey: process.env.REACT_APP_DATA_DECODING_API_KEY,
      pageNo,
      numOfRows,
      // TODO: emdongNm과 radius를 기반으로 주변 약국만 검색하도록 변경 가능
    },
  });
  const pharmacies = data.response.body.items.item.map(pharmacy => {
    return {
      name: pharmacy.yadmNm,
      address: pharmacy.addr,
      tel: pharmacy.telno,
      ykiho: pharmacy.ykiho,
    };
  });

  return {
    pharmacies,
    pageNo,
  };
};
