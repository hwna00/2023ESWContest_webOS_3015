import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getHospitals = async hospitalName =>
  await instance.get(`/hospitals?name=${hospitalName}`);

export const createDoctor = async doctor => {
  const { data } = await instance.post('/doctors', { data: doctor });
  return data;
};
