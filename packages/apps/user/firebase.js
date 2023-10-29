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

import { updateMe } from './src/api';

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

// TODO: nftfblob 함수와 통일하기 - path 방식으로
export const uploadBlob = async (blob, uid) => {
  const storageRef = ref(storage, `${uid}/profileImg.png`);
  await uploadBytes(storageRef, blob);
};

export const getBlob = async path => {
  try {
    const url = await getDownloadURL(ref(storage, path));
    return url;
  } catch (error) {
    console.log('error', error);
    return '';
  }
};

export const uploadNftfBlob = async (blob, path) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob);
};

export const fbSignUp = async data => {
  const { email, password, profileImgBlob } = data;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await uploadBlob(profileImgBlob, user.uid);

  return user.uid;
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
    return updateMe({ ...data, uid: user.uid });
  } catch (error) {
    return console.log(error);
  }
};

export const fbLogOut = async () => signOut(auth);
