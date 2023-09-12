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
    userImg: userImgSlice.reducer,
    appointment: appointmentSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setImg } = userImgSlice.actions;
export const { setAppointDatetime } = appointmentSlice.actions;
