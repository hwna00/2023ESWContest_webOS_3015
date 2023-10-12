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
  console.log('get appointments...');
  try {
    const { data } = await instance.get(`/doctors/${doctorId}/appointments`);
    console.log(data);
    if (data.isSuccess) {
      return data.result;
    }
    throw new Error(data.message);
  } catch (error) {
    return error;
  }
};
