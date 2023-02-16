import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// We can do this because we are using the `Thunk` middleware
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};

export const removeAlert = (msg, alertType) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: REMOVE_ALERT,
    payload: { msg, alertType, id },
  });
};
