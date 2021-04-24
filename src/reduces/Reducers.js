
import Signin from '../Sign in/Signin'
import signinReducer from './signinReducer';
import userposts from './userposts';
import {combineReducers} from 'redux';
import count from './count'
import main from './main';
import user from './user'
import feedposts from './feedposts'
import Likeposts from './Likeposts';
const Reducers=combineReducers({signinReducer,main,user,userposts,count,feedposts,Likeposts});
export default Reducers;