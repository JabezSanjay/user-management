import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    userInfo: {},
    error: false,
    loading: false,
    reload: false,
  },
  reducers: {
    getUsersInProgress: (state, action) => {
      state.loading = true;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFailure: (state, action) => {
      state.loading = false;
      state.error = true;
    },
    createUserInProgress: (state, action) => {
      state.loading = true;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.reload = !state.reload;
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  getUsersInProgress,
  getUsersSuccess,
  getUsersFailure,
  createUserInProgress,
  createUserSuccess,
  createUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
