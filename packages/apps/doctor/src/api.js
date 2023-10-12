import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
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
      return data.result;
    }
    throw new Error(data.message);
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
