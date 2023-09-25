import axios from 'axios';

import { getUserImage } from '../firebase';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createUser = () => {};

export const getMe = async email => {
  const { user } = await instance.get(`/users/me?email=${email}`);

  if (!user) {
    // TODO: 해당 유저가 존재하지 않는 경우에 대한 처리
  } else {
    // return { ...user, profileImg: getUserImage(email) };
    return {
      name: '하철환',
      profileImg: getUserImage(),
    };
  }
};
