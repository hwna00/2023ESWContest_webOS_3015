import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API}/api`,
});

export const getHospitals = async hospitalName =>
  instance.get(`/hospitals?name=${hospitalName}`);

export const createDoctor = async doctor => {
  const { data } = await instance.post('/doctors', { data: doctor });
  return data;
};

export const getDoctor = async doctorId => {
  const { data } = await instance.get(`/doctors/${doctorId}`);

  if (data.isSuccess) {
    return data.result;
  }
  throw new Error(data.message);
};

export const getAppointments = async doctorId => {
  try {
    const { data } = await instance.get(`/doctors/${doctorId}/appointments`);
    if (data.isSuccess) {
      return [...data.result];
    }
    return [];
  } catch (error) {
    return error;
  }
};

export const getAppointment = async appointmentId => {
  try {
    const { data } = await instance.get(`appointments/${appointmentId}`);
    if (data.isSuccess) {
      return data.result;
    }
    throw new Error(data.message);
  } catch (error) {
    return error;
  }
};

export const createDiagnoses = async (appointmentId, content) => {
  const { data } = await instance.post('diagnoses', {
    data: { appointmentId, content },
  });
  console.log(data);
};

export const updateAppointment = async appointmentId => {
  const { data } = await instance.patch(`appointments/${appointmentId}`, {
    data: { stateId: 'dc' },
  });
  console.log(data);
};
