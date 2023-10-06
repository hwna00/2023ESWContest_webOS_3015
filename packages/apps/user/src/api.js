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
  //TODO: 아직 구현되지 않음
  return await instance.get(`/appointments/${uid}`);
};

export const getHospitals = () => {
  return instance.get('/hospitals').then(res => res.data);
};

export const getDoctors = () => {
  return instance.get('/doctors').then(res => res.data);
};
