import axios from 'axios';
import LS2Request from '@enact/webos/LS2Request';
import { getTrmtHours } from './utils/converter';

const bridge = new LS2Request();
const SERVICE_URL = 'luna://com.housepital.user.app.service';

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
    const { aw, ac, ar } = await data.result;

    return [...aw, ...ac, ...ar];
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAppointment = async appointmentId => {
  const { data } = await instance.delete(`/appointments/${appointmentId}`);
  return data;
};

export const createFavorite = async data => {
  return await instance.post(`/favorites`, { data });
};

export const deleteFavorite = async (type, favorite) => {
  const { data } = await instance.delete(`/favorites?type=${type}`, {
    data: favorite,
  });
  return data.result;
};

export const getFavorite = async (uid, type = '') => {
  try {
    const { data } = await instance.get(`/users/${uid}/favorites?type=${type}`);
    console.log(data.result);
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
  if (!data.isSuccess) {
    return [
      {
        type: '심박수',
      },
      {
        type: '체온',
      },
      {
        type: '혈당',
      },
    ];
  }
  return data.result;
};

export const getVitalSigns = async (uid, type = '') => {
  let typeForDb;
  switch (type) {
    case 'bpm':
      typeForDb = 'heartRate';
      break;
    default:
      typeForDb = type;
      break;
  }
  const { data } = await instance.get(
    `/users/${uid}/vital-signs?type=${typeForDb}`,
  );

  if (!data.isSuccess) {
    return [];
  }
  return [
    {
      id: type,
      data: data.result?.map(item => ({
        x: item.time,
        y: item.value,
      })),
    },
  ];
};

export const getRecentVitalSigns = async uid => {
  const { data } = await instance.get(`/users/${uid}/recent-vital-signs`);
  const basicFormat = [
    {
      id: new Date(),
      name: '체온',
      type: 'temperature',
      value: '값을 측정해주세요',
      time: '',
    },
    {
      id: new Date(),
      name: '심박수',
      type: 'bpm',
      value: '값을 측정해주세요',
      time: '',
    },
  ];

  if (!data.isSuccess) {
    return basicFormat;
  }

  return basicFormat.map(format => {
    data.result.forEach(item => {
      if (format.type === item.type) {
        format.id = item.id;
        format.value = Math.round(item.value * 10) / 10;
        format.time = `${item.date} ${item.time}`;
      }
    });

    return format;
  });
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

export const createSideEffectHistory = async (uid, history) => {
  const { data } = await instance.post(`/users/${uid}/side-effects`, {
    data: history,
  });
  console.log(data);
  return data;
};

export const getSideEffectHistory = async uid => {
  const { data } = await instance.get(`/users/${uid}/side-effects`);

  return data.result;
};

export const lsCreateAlert = msg => {
  console.log(msg);
  const lsRequest = {
    service: SERVICE_URL,
    method: 'createNotification',
    parameters: { message: msg },
    onSuccess: response => console.log('success', response),
    onFailure: response => console.log('fail', response),
  };
  bridge.send(lsRequest);
};
