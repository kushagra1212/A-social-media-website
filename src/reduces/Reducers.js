
import signinReducer from './signinReducer';
import userposts from './userposts';
import {combineReducers} from 'redux';
import count from './count'
import main from './main';
import user from './user'
import feedposts from './feedposts'
import Likeposts from './Likeposts';
import Stories from './Stories';
import MessageReducer from './MessageReducer';
import Posts from './Posts';
import Suggestions from './Suggestions';
const Reducers=combineReducers({signinReducer,main,user,userposts,count,feedposts,Likeposts,Stories,MessageReducer,Posts,Suggestions});
export default Reducers;