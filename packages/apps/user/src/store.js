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

export const store = configureStore({ reducer: userImgSlice.reducer });

export const { setImg } = userImgSlice.actions;
