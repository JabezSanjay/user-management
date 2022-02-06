import axios from '../../axiosConfig';
import {
  getUsersInProgress,
  getUsersSuccess,
  getUsersFailure,
  createUserInProgress,
  createUserSuccess,
  createUserFailure,
} from '../../redux/reducers/userReducer';

export const getUsers = async (dispatch) => {
  dispatch(getUsersInProgress());
  try {
    const response = await axios.get('/users');
    dispatch(getUsersSuccess(response.data.users));
  } catch (error) {
    dispatch(getUsersFailure());
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
