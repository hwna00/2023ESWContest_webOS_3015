import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createUser = async data => {
  return await instance.post('/users', { data });
};

export const updateMe = async data => {
  instance.patch('/users/me', data);
};

export const getMe = async uid => {
  const {
    data: { result },
  } = await instance.get(`/users/${uid}`);

  return result;
};

export const createAppointment = data => {
  //TODO: 예약 객체를 전달하는 axios 요청을 작성해야 함.
  console.log(data);
};

export const getHospitals = () => {
  return instance.get('/hospitals').then(res => res.data);
};

export const getDoctors = () => {
  return instance.get('/doctors').then(res => res.data);
};
