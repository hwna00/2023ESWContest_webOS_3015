import { configureStore, createSlice } from '@reduxjs/toolkit';

const userImgSlice = createSlice({
  name: 'userImg',
  initialState: { url: '' },
  reducers: {
    setImg: (state, action) => {
      state.url = action.payload;
    },
  },
});

const apointmentSlice = createSlice({
  name: 'appointment',
  initialState: { list: [], reservation: { date: '', time: '', type: '' } },
  reducers: {
    setAppointDatetime: (state, action) => {
      state.date = action.payload.date;
      state.time = action.payload.time;
    },
  },
});

export const store = configureStore({
  reducer: {
    userImg: userImgSlice.reducer,
    appointment: apointmentSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setImg } = userImgSlice.actions;
export const { setAppointDatetime } = apointmentSlice.actions;
