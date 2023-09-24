import axios from 'axios';
import { getUserImage } from '../firebase';

//TODO: 요청 시 access_token or refresh_token 보내는 기능 추가
const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  //TODO: 필요한 경우에만 withCredentials 추가하도록 수정
  // withCredentials: true,
});

export const createUser = async data => {
  try {
    const user = await instance.post('/auth/create-user', data);
    return user;
  } catch (error) {
    console.log(error);
  }
};

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
