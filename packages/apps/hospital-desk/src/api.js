import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API}/api`,
});

export const fetchResultsTime = async ykiho => {
  const BASE_URL = ` http://apis.data.go.kr/B551182/MadmDtlInfoService2`;
  const { data } = await axios.get(
    `${BASE_URL}/getDtlInfo2?serviceKey=${process.env.REACT_APP_PUBLIC_DP_API_KEY}&ykiho=${ykiho}&_type=json`,
  );
  return data;
};

export const createHospital = async hospital => {
  const { data } = await instance.post('/hospitals', { data: hospital });

  return data;
};

export const updatePayment = (appointmentId, payment) => {
  instance.patch(`/diagnoses/${appointmentId}`, {
    data: { payment: payment },
  });
};

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
  return await instance.patch(`/appointments/${id}`, {
    data: {
      stateId: newStateId,
      rejectionReason: rejectionReason,
    },
  });
};
export const getPatientDetail = async queryKey => {
  const appointmentId = parseInt(queryKey.queryKey[0]);

  const response = await instance.get(`/appointments/${appointmentId}?`);
  if (response.data) {
    return response.data.result;
  } else {
    return {};
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
