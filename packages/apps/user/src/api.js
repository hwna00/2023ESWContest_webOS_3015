import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const signUpWithFb = data => {
  instance.post('/auth/firebase/sign-up', data).then(user => user);
};

export const checkUserExist = email => {
  instance
    .get(`/users?email=${email}`)
    .then(res => res.data)
    .catch(error => error);
};
