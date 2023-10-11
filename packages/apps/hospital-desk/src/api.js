import axios from 'axios';
import { Error } from 'mongoose';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchResultsTime = async ykiho => {
  const BASE_URL = ` http://apis.data.go.kr/B551182/MadmDtlInfoService2`;
  const { data } = await axios.get(
    `${BASE_URL}/getDtlInfo2?serviceKey=${process.env.REACT_APP_PUBLIC_DP_API_KEY}&ykiho=${ykiho}&_type=json`,
  );
  return data;
};

export const createHospital = async hospital => {
  const { data } = await instance.post('hospitals', { data: hospital });
  console.log(data);
  return data;
};

export const postPayment = (id, payment) =>
  instance.post(`/appointments/${id}/payment/`, { data: payment });

export const updatePayment = (id, payment) =>
  instance.patch(`/appointments/${id}/payment/`, { data: payment });

export const getAppointments = async ({ queryKey }) => {
  const hospitalId = queryKey[0];

  const { data: appointments } = await instance.get(
    `/hospitals/${hospitalId}/appointments`,
  );
  if (!appointments.isSuccess && appointments.code === 404) {
    return [];
  }
  return appointments.result;
};

export const updateAppointmentState = async (
  id,
  newStateId,
  rejectionReason,
) => {
  return await instance.patch(`appointments/${id}`, {
    data: {
      stateId: newStateId,
      rejectionReason: rejectionReason,
    },
  });
};

export const getPatientDetail = appointmentId => {
  const { data: patient } = instance.get(`/appointments/${appointmentId}?`);

  if (patient) {
    return patient;
  } else {
    // return patient;
    return {
      name: 'test',
      phoneNumber: '01012341234',
      birthDate: '2000-10-10',
      uid: 'ghdtpdnjs123124215215',
      address: '서울 강남구 논현로123길 4-1', // 아직 입력되지 않았으면 ""
      bloodType: 'AB',
      chronicDisease: '123123',
      height: '123',
      regularMedicines: 'sfdsfsdf',
      secondPhoneNumber: '12121212',
      weight: '123',
      gender: 'M',
      datetime: '2023-09-30 09:10',
      message: '안녕하세요',
      isNFTF: 1,
      profileImg:
        'https://i.namu.wiki/i/AzUH8U5TcGdNJDN9Fl5zyEsLdL72N-PBsR0OjvAtmHRAwSDIcDwRAfYS5m_X_i0KFlZdmGNkwb5f8D_eC3vTuQ.webp',
    };
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

export const updateHospital = (hospitalId, data) => {
  return instance.patch(`/hospitals/${hospitalId}`, data);
};
