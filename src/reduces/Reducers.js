
import Signin from '../Sign in/Signin'
import signinReducer from './signinReducer';
import userposts from './userposts';
import {combineReducers} from 'redux';
import main from './main';
import user from './user'
const Reducers=combineReducers({signinReducer,main,user,userposts});
export default Reducers;