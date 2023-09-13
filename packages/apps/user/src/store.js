import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

const userImgSlice = createSlice({
  name: 'userImg',
  initialState: { url: '' },
  reducers: {
    setImg: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: { userImg: userImgSlice.reducer, user: userSlice.reducer },
});

export const { setImg } = userImgSlice.actions;
export const { setUser } = userSlice.actions;
