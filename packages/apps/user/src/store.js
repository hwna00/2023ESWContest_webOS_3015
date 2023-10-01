import { configureStore, createSlice } from '@reduxjs/toolkit';

const userInitialState = {
  uid: '',
  name: '',
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
      Object.entries(action.payload).map(
        ([key, value]) => (state[key] = value),
      );
    },
    resetMe: () => userInitialState,
  },
});

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: { date: '', time: '', type: '' },
  reducers: {
    setAppointDatetime: (state, action) => {
      state.date = action.payload.date;
      state.time = action.payload.time;
    },
  },
});

export const store = configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
    me: meSlice.reducer,
    appointment: appointmentSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setImgBlob, setErrors, setAddress } = signUpSlice.actions;
export const { setAppointDatetime } = appointmentSlice.actions;
export const { setMe, resetMe } = meSlice.actions;
