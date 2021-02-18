
import Signin from '../Sign in/Signin'
import signinReducer from './signinReducer';
import {combineReducers} from 'redux';
import main from './main';
const Reducers=combineReducers({signinReducer,main});
export default Reducers;