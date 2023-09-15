import { configureStore, createSlice } from '@reduxjs/toolkit';

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: { errors: {}, url: '' },
  reducers: {
    setImg: (state, action) => {
      state.url = action.payload;
    },
    setErrors: (_, action) => {
      return { errors: { ...action.payload } };
    },
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
    appointment: appointmentSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setImg, setErrors } = signUpSlice.actions;
export const { setAppointDatetime } = appointmentSlice.actions;
