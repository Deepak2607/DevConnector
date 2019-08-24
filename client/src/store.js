import {createStore,combineReducers,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import auth_reducer from './reducers/auth';
import alert_reducer from './reducers/alert';


//store arguments
const combinedReducer= combineReducers({
    auth_reducer:auth_reducer,
    alert_reducer:alert_reducer
})
const initialState= {};
const middleware = [thunk];


//creating store
const store=createStore(
        combinedReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
);


store.subscribe(()=> {
    console.log(store.getState());
})


export default store;