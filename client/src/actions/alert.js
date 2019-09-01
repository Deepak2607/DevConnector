import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    data: { msg, alertType, id }
  });
 
  //this is automatically dispatched after 5 seconds
  setTimeout(() => dispatch({ type: REMOVE_ALERT, id: id }), 5000);
};
