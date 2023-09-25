import axios from 'axios';
import { getUserImage } from '../firebase';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getMe = async () => {
  const { user } = await instance.get(`/users/me`);
  if (!user) {
    //TODO: 해당 유저가 존재하지 않는 경우에 대한 처리
  } else {
    // return user
    return {
      name: '하철환',
      profileImg: getUserImage(),
    };
  }
};
