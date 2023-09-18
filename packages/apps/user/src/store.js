import { configureStore, createSlice } from '@reduxjs/toolkit';

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

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => action.payload,
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
    user: userSlice.reducer,
    appointment: appointmentSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['signUp/setImgBlob'],
        ignoredPaths: ['signUp.blob'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setImgBlob, setErrors, setAddress } = signUpSlice.actions;
export const { setAppointDatetime } = appointmentSlice.actions;
export const { setUser } = userSlice.actions;
