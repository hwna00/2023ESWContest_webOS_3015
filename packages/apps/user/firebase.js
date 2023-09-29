import Cookie from 'js-cookie';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCustomToken,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import { createUser, updateMe } from './src/api';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_API_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);

export const uploadBlob = async (blob, uid) => {
  const storageRef = ref(storage, `${uid}/profileImg.png`);
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

export const fbEmailLogIn = async data => {
  await setPersistence(auth, browserLocalPersistence);
  const { email, password } = data;

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    return console.log(error);
  }
};

export const fbTokenLogIn = async data => {
  await setPersistence(auth, browserLocalPersistence);
  const token = Cookie.get('token');

  try {
    const { user } = await signInWithCustomToken(auth, token);
    await updateMe({ ...data, uid: user.uid });
    return user;
  } catch (error) {
    return console.log(error);
  }
};

export const fbLogOut = async () => signOut(auth);
