import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import { createUser } from './src/api';

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
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export const uploadBlob = async (blob, email) => {
  const storageRef = ref(storage, `${email}/profileImg.png`);
  await uploadBytes(storageRef, blob);
};

export const getUserImage = email => {
  getDownloadURL(ref(storage, `${email}/profileImg.png`))
    .then(url => console.log(url))
    .catch(() => null);
};

export const fbSignUp = async data => {
  const { email, password, ...rest } = data;
  const isUserExist = false; // getMe();

  if (isUserExist) {
    // TODO: 사용자가 존재한다는 알림 전송
    // TODO: 로그인 페이지로 리디렉트
  } else {
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      createUser({ email, ...rest });
      uploadBlob(rest.profileImgBlob, email);
    });
    return createUser({ ...rest, email });
  }
};

export const fbLogIn = async data => {
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
    console.log(userCredential._tokenResponse);
    // TODO: email을 가지는 user 정보를 DB에서 가져온다.

    // TODO: CASE1. 이미 존재하는 경우 -> 경고알림 or 바로 로그인
    // TODO: CASE2. 존재하지 않는 경우 -> 회원가입 진행
  }
};

export const googleLogin = () => signInWithPopup(auth, provider);
