import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_API_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const fbSignUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const { uid } = userCredential.user;
      return uid;
    })
    .catch(error => {
      console.error('Error during signing up:', error);
      throw error;
    });
const logIn = async data => {
  const { email, password } = data;
  const isUserExist = true;

  if (!isUserExist) {
    // TODO: 존재하지 않는 회원입니다 알림 발송
  } else {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log(userCredential);
    // console.log(userCredential._tokenResponse);
    // TODO: email을 가지는 user 정보를 DB에서 가져온다.

    // TODO: CASE1. 이미 존재하는 경우 -> 경고알림 or 바로 로그인
    // TODO: CASE2. 존재하지 않는 경우 -> 회원가입 진행
  }
};

export { auth, fbSignUp, logIn };
