import { configureStore, createSlice } from '@reduxjs/toolkit';

const counselorInitialState = {
  id: '',
  name: '',
  centerName: '',
  address: '',
  profileImg: '',
  tel: '',
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

const counselorSlice = createSlice({
  name: 'counselor',
  initialState: counselorInitialState,
  reducers: {
    setCounselor: (state, action) => {
      if (action.payload !== undefined) {
        Object.entries(action.payload).map(
          ([key, value]) => (state[key] = value),
        );
      }
    },
    resetCounselor: () => counselorInitialState,
  },
});

export const store = configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
    counselor: counselorSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setImgBlob, setErrors, setAddress } = signUpSlice.actions;
export const { setCounselor, resetCounselor } = counselorSlice.actions;
