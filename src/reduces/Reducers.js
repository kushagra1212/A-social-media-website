
import Signin from '../Sign in/Signin'
import signinReducer from './signinReducer';
import {combineReducers} from 'redux';
import main from './main';
import user from './user'
const Reducers=combineReducers({signinReducer,main,user});
export default Reducers;