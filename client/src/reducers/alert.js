
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState= {
    alerts:[]
}

const alert_reducer=(state=initialState, action)=> {
     
    switch (action.type) {
    case SET_ALERT:      
      return {
          ...state,
          alerts:state.alerts.concat(action.data)  
      }
    case REMOVE_ALERT:
      const updatedAlerts= state.alerts.filter(alert => alert.id !== action.id);
      return {
          ...state,
          alerts:updatedAlerts
    }
    default:
      return state;
  }
}

export default alert_reducer;




