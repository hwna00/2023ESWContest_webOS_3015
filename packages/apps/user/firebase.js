import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { checkUserExist, signUpWithFb } from './src/api';

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

const uploadBlob = (blob, email) => {
  const storageRef = ref(storage, `${email}/profileImg.png`);

  uploadBytes(storageRef, blob).catch(() => {});
};

const fbSignUp = data => {
  const { email, password, ...rest } = data;
  const isUserExist = checkUserExist(email);

  if (isUserExist) {
    return null;
  } else {
    createUserWithEmailAndPassword(auth, email, password).then(
      userCredential => {
        const { email } = userCredential.user;
        uploadBlob(rest.profileImgBlob, email);
        return signUpWithFb({ ...rest, email });
      },
    );
  }
};

const fbLogIn = data => {
  const { email, data } = data;

  //TODO: DB에 해당 email과 같은 메일이 존재하는지 확인. 존재한다면 해당 아이디가 이미 존재한다는 경고메시지 전송

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const { email } = userCredential.user;
      //TODO: email을 가지는 user 정보를 DB에서 가져온다.
    })
    .catch(error => {
      //TODO: CASE1. 이미 존재하는 경우 -> 경고알림 or 바로 로그인
      //TODO: CASE2. 존재하지 않는 경우 -> 회원가입 진행
      console.log(error);
    });
};

const googleLogin = () => {
  return signInWithPopup(auth, provider);
};

export { auth, fbSignUp, fbLogIn, googleLogin, provider, storage };
