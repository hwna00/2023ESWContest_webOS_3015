import { configureStore, createSlice } from '@reduxjs/toolkit';

const centerInitialState = {
  id: '',
  name: '',
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

const centerSlice = createSlice({
  name: 'center',
  initialState: centerInitialState,
  reducers: {
    setCenter: (state, action) => {
      if (action.payload !== undefined) {
        Object.entries(action.payload).map(
          ([key, value]) => (state[key] = value),
        );
      }
    },
    resetCenter: () => centerInitialState,
  },
});

export const store = configureStore({
  reducer: {
    signUp: signUpSlice.reducer,
    center: centerSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const { setImgBlob, setErrors, setAddress } = signUpSlice.actions;
export const { setCenter, resetCenter } = centerSlice.actions;
