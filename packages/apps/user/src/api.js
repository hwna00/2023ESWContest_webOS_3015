import axios from 'axios';

import { getUserImage } from '../firebase';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createUser = data => {
  //TODO: data를 가지는 사용자를 생성
};

export const updateMe = async data => {
  instance.patch('/users/me', data);
};

//TODO: email을 uid로 교체해야 한다
export const getMe = async email => {
  const { data: me } = await instance.get(`/users/me?email=${email}`);

  if (!me) {
    // TODO: 해당 유저가 존재하지 않는 경우에 대한 처리
  } else {
    // return me;
    return {
      name: 'test',
      phoneNumber: '01012341234',
      birthDate: '2000-10-10',
    };
  }
};
