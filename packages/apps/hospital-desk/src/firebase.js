import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
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

const fbLogIn = async data => {
  await setPersistence(auth, browserLocalPersistence);
  const { email, password } = data;
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user.uid);
    return user.uid;
  } catch (error) {
    return error;
  }
};

const fbLogOut = async () => signOut(auth);

export { auth, fbSignUp, fbLogIn, fbLogOut };
