// import axios from 'axios';
import api from '../utils/api';
import { setAlert } from './alertActions';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status },
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Create or Update Profile
export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const res = await api.post('/profile', formData, config);

      dispatch({ type: GET_PROFILE, payload: res.data });
      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'sucess')
      );

      // TO REDIRECT WITHIN AN ACTION, WE CAN"T USE <NAVIGATE /> LIKE WE DO IN THE COMPONENTS. WE HAVE TO USE HISTORY OBJEXT WHICH HAS THE PUSH METHOD
      // if (!edit) {
      //   history.push('/dashboard');
      // }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.data.msg, status: err.response.status },
      });
    }
  };
