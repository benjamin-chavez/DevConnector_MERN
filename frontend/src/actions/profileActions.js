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
