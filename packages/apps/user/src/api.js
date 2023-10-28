import axios from 'axios';
import { getTrmtHours } from './utils/converter';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API}/api`,
});

export const createUser = async user => {
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
    const { data: doctors } = await instance.get('/doctors');

    return doctors.result;
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
  return data;
};

export const getDiagnoses = async uid => {
  try {
    const { data } = await instance.get(`users/${uid}/diagnoses`);

    if (!data.isSuccess) {
      throw new Error();
    }
    return data.result;
  } catch (error) {
    throw new Error(error);
  }
};

export const getDiagnosis = async diagnosisId => {
  try {
    const { data } = await instance.get(`diagnoses/${diagnosisId}`);

    if (!data.isSuccess) {
      throw new Error();
    }
    return data.result;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateDiagnosis = async (appointmentId, pharmacy) => {
  const { data } = await instance.patch(`diagnoses/${appointmentId}`, {
    data: {
      pharmacyName: pharmacy.name,
      pharmacyYkiho: pharmacy.ykiho,
    },
  });
  console.log(data);
};

export const getMedicines = async (uid, day = '') => {
  try {
    const { data } = await instance.get(`/users/${uid}/medecines?day=${day}`);
    if (!data.isSuccess) {
      return null;
    }

    return data.result;
  } catch (error) {
    console.log(error);
  }
};

export const addMedicine = async (uid, intake) => {
  const { data } = await instance.post('/medicines', {
    data: { uid, ...intake },
  });
  console.log(data);
  return data;
};

export const getHospitalDtl = async ykiho => {
  const base = 'http://apis.data.go.kr/B551182/MadmDtlInfoService2';
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
  const ykiho = queryKey[1];

  if (ykiho === '') {
    return {};
  }
  const base = 'http://apis.data.go.kr/B551182/MadmDtlInfoService2';
  try {
    const { data: dgsbjt } = await axios.get(`${base}/getDgsbjtInfo2`, {
      params: {
        serviceKey: process.env.REACT_APP_DATA_DECODING_API_KEY,
        ykiho,
        type: 'json',
      },
    });
    const { item } = dgsbjt.response.body.items;

    if (!Array.isArray(item)) {
      return [item];
    }
    return dgsbjt.response.body.items.item;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPharmacies = async ({ pageNo, numOfRows }) => {
  const base =
    'http://apis.data.go.kr/B551182/pharmacyInfoService/getParmacyBasisList';
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

export const createVitalSign = async (uid, value) => {
  const { data } = await instance.post('/vital-signs', {
    data: { uid, ...value },
  });
  return data;
};

export const getVitalSigns = async (uid, type) => {
  const { data } = await instance.get(`/users/${uid}/vital-signs?type=${type}`);

  if (!data.isSuccess) {
    return [];
  }
  return [
    {
      id: type,
      data: data.result.map(item => ({
        x: item.time,
        y: item.value,
      })),
    },
  ];
};

export const getSideEffect = async itemName => {
  const service_url =
    'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList';

  const { data } = await axios.get(service_url, {
    params: {
      serviceKey: process.env.REACT_APP_DATA_DECODING_API_KEY,
      itemName,
      type: 'json',
    },
  });

  if (!data.body.items) {
    return `${itemName}의 정보가 등록되어 있지 않습니다.`;
  }
  return data.body.items[0];
};

export const getIntent = async symptom => {
  const { data } = await instance.post('/dialogflow', { symptom });
  return data;
};

export const getCenters = async () => {
  const { data } = await instance.get('counselors');

  return data.result.map(center => ({
    name: center.center_name,
    id: center.counselor_id,
  }));
};
