import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const signUpWithFb = data => {
  //TODO: DB에 User 정보 저장
  instance.post('/auth/firebase/sign-up', data).then(() => [
    //TODO: 메인 화면으로 리디렉트
  ]);
};
