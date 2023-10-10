import { configureStore, createSlice } from '@reduxjs/toolkit';

const hospitalInitialState = {
  hospitalId: '',
  ykiho: '',
  name: '',
  address: '',
  profileImg: '',
  phoneNumber: '',
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

const hospitalSlice = createSlice({
  name: 'hospital',
  initialState: hospitalInitialState,
  reducers: {
    setHospital: (state, action) => {
      if (action.payload !== undefined) {
        Object.entries(action.payload).map(
          ([key, value]) => (state[key] = value),
        );
      }
    },
    resetHospital: () => hospitalInitialState,
  },
});

export const store = configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
    hospital: hospitalSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setImgBlob, setErrors, setAddress } = signUpSlice.actions;
export const { setHospital, resetHospital } = hospitalSlice.actions;
