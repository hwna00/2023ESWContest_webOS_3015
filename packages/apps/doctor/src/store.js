import { configureStore, createSlice } from '@reduxjs/toolkit';

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {},
  reducers: {
    setDoctor: (_, action) => {
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    doctor: doctorSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setDoctor } = doctorSlice.actions;
