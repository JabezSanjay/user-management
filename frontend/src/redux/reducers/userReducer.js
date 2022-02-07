import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    userInfo: {},
    error: false,
    createLoading: false,
    readLoading: false,
    updateLoading: false,
    deleteLoading: false,
    reload: false,
  },
  reducers: {
    getUsersInProgress: (state, action) => {
      state.readLoading = true;
    },
    getUsersSuccess: (state, action) => {
      state.readLoading = false;
      state.users = action.payload;
    },
    getUsersFailure: (state, action) => {
      state.readLoading = false;
      state.error = true;
    },
    getOneUserInProgress: (state, action) => {
      state.readLoading = true;
    },
    getOneUserSuccess: (state, action) => {
      state.readLoading = false;
      state.userInfo = action.payload;
    },
    getOneUserFailure: (state, action) => {
      state.readLoading = false;
      state.error = true;
    },
    clearOneUser: (state, action) => {
      state.userInfo = {};
    },
    createUserInProgress: (state, action) => {
      state.createLoading = true;
    },
    createUserSuccess: (state, action) => {
      state.createLoading = false;
      state.reload = !state.reload;
    },
    createUserFailure: (state, action) => {
      state.createLoading = false;
      state.error = true;
    },
    updateUserInProgress: (state, action) => {
      state.updateLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.updateLoading = false;
      state.reload = !state.reload;
    },
    updateUserFailure: (state, action) => {
      state.updateLoading = false;
      state.error = true;
    },
    deleteUserInProgress: (state, action) => {
      state.deleteLoading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.deleteLoading = false;
      state.reload = !state.reload;
    },
    deleteUserFailure: (state, action) => {
      state.deleteLoading = false;
      state.error = true;
    },
  },
});

export const {
  getUsersInProgress,
  getUsersSuccess,
  getUsersFailure,
  getOneUserInProgress,
  getOneUserSuccess,
  getOneUserFailure,
  clearOneUser,
  createUserInProgress,
  createUserSuccess,
  createUserFailure,
  updateUserInProgress,
  updateUserSuccess,
  updateUserFailure,
  deleteUserInProgress,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
