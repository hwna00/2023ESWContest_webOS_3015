import axios from 'axios';
import { getUserImage } from '../firebase';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createUser = data => {
  instance.post('/auth/firebase/sign-up', data).then(user => user);
};

export const checkUserExist = email => {
  instance
    .get(`/users?email=${email}`)
    .then(res => res.data)
    .catch(error => error);
};

export const getMe = () => {
  //TODO: instance.get(`/users/me`).then(res => res.data);
  return {
    name: '하철환',
    profileImg: getUserImage(),
  };
};
