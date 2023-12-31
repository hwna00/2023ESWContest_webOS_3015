import { configureStore, createSlice } from '@reduxjs/toolkit';

const userInitialState = {
  uid: '',
  username: '',
  email: '',
  phoneNumber: '',
  secondPhoneNumber: '',
  address: '',
  addressDetail: '',
  birthDate: '',
  bloodType: '',
  height: '',
  weight: '',
  gender: '',
  regularMedicines: '',
  chronicDisease: '',
  profileImg: '',
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: { errors: {}, blob: '', address: '' },
  reducers: {
    setImgBlob: (state, action) => {
      state.blob = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = { ...action.payload };
    },
  },
});

const meSlice = createSlice({
  name: 'me',
  initialState: userInitialState,
  reducers: {
    setMe: (state, action) => {
      if (action.payload !== undefined) {
        Object.entries(action.payload).map(
          ([key, value]) => (state[key] = value),
        );
        return state;
      }
    },
    resetMe: () => userInitialState,
  },
});

const trmtSlice = createSlice({
  name: 'trmt',
  initialState: { uid: '', appointmentId: '', doctorId: '' },
  reducers: {
    setTrmt: (state, action) => {
      const { uid, appointmentId, doctorId } = action.payload;
      state.uid = uid;
      state.appointmentId = appointmentId;
      state.doctorId = doctorId;
    },
  },
});

export const store = configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
    me: meSlice.reducer,
    trmt: trmtSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setImgBlob, setErrors, setAddress } = signUpSlice.actions;
export const { setMe, resetMe } = meSlice.actions;
export const { setTrmt } = trmtSlice.actions;
