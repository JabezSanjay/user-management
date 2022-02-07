import { toast } from 'react-toastify';
import axios from '../../axiosConfig';
import {
  getUsersInProgress,
  getUsersSuccess,
  getUsersFailure,
  createUserInProgress,
  createUserSuccess,
  createUserFailure,
  getOneUserInProgress,
  getOneUserSuccess,
  getOneUserFailure,
  updateUserInProgress,
  updateUserSuccess,
  updateUserFailure,
  deleteUserInProgress,
  deleteUserSuccess,
  deleteUserFailure,
} from '../../redux/reducers/userReducer';

export const getUsers = async (dispatch) => {
  dispatch(getUsersInProgress());
  try {
    const response = await axios.get('/users');
    dispatch(getUsersSuccess(response.data.users));
    return response.data;
  } catch (error) {
    dispatch(getUsersFailure());
  }
};

export const getAllDeletedUsers = async (dispatch) => {
  dispatch(getUsersInProgress());
  try {
    const response = await axios.get('/users/deleted');
    dispatch(getUsersSuccess(response.data.users));
    return response.data;
  } catch (error) {
    dispatch(getUsersFailure());
  }
};

export const getOneUser = async (dispatch, id) => {
  dispatch(getOneUserInProgress());
  try {
    const response = await axios.get(`/user/${id}`);
    dispatch(getOneUserSuccess(response.data.user));
    return response.data;
  } catch (error) {
    dispatch(getOneUserFailure());
  }
};

export const createUser = async (dispatch, data) => {
  dispatch(createUserInProgress());
  try {
    let response = await axios.post('/user/create', data);
    dispatch(createUserSuccess());
    return response.data;
  } catch (error) {
    dispatch(createUserFailure());
  }
};

export const updateUser = async (dispatch, data, id) => {
  dispatch(updateUserInProgress());
  try {
    let response = await axios.put(`/user/update/${id}`, data);
    dispatch(updateUserSuccess());
    return response.data;
  } catch (error) {
    toast.error('Something went wrong!');
    dispatch(updateUserFailure());
    return error;
  }
};

export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUserInProgress());
  try {
    let response = await axios.delete(`/user/delete/${id}`);
    dispatch(deleteUserSuccess());
    return response.data;
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

export const restoreUser = async (dispatch, id) => {
  dispatch(deleteUserInProgress());
  try {
    let response = await axios.put(`/user/restore/${id}`);
    dispatch(deleteUserSuccess());
    return response.data;
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};
