import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import dotenv from 'dotenv';

dotenv.config();

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
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  if (rest?.profileImgBlob) {
    await uploadBlob(rest.profileImgBlob, user.uid);
  }

  return user.uid;
};

export const fbEmailLogIn = async data => {
  await setPersistence(auth, browserLocalPersistence);
  const { email, password } = data;
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user.uid;
};

export const fbLogOut = async () => signOut(auth);
