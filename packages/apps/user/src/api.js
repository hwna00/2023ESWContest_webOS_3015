import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createUser = data => {
  //TODO: data를 가지는 사용자를 생성
  console.log(data);
};

export const updateMe = async data => {
  instance.patch('/users/me', data);
};

export const getMe = async uid => {
  const { data: me } = await instance.get(`/users/${uid}`);

  if (!me) {
    // TODO: 해당 유저가 존재하지 않는 경우에 대한 처리
  } else {
    // return me;
    return {
      uid: 'test12',
      name: 'test',
      phoneNumber: '01012341234',
      birthDate: '2000-10-10',
    };
  }
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
