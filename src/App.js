
import Main from './Main';
import Signin from './Sign in/Signin';
import Signup from './Sign up/Signup';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {getuser} from './reduces/actions/userAction'
import {useEffect, useState} from 'react';
import {getstarted} from './methods/uploadstories';
import {stories_started} from './reduces/actions/StoriesAction';
const URL =process.env.REACT_APP_URL;
const App=()=>{
  const dispatch=useDispatch();
  let access=useSelector(state=>state.signinReducer.access);
  const issignup=useSelector(state=>state.signinReducer.signup);
 const {username} =useSelector(state=>state.user);
  useEffect(()=>{
axios.get(`${URL}/auth/verify`,{withCredentials:true}).then(async(res)=>{
  console.log(res.data.access)
  dispatch(getuser(res.data.id));
        
 

setTimeout(() => {
  dispatch({type:'access',payload:res.data.access});

}, 1000);
if(username)
{
  let data=await getstarted(username);
     
  if(data.started) {dispatch(stories_started(data.started,data.picture));console.log("HO")}
  else dispatch(stories_started(data.started,[]));
}

 

}).catch(err=>console.log(err));
  },[])
    return (<div>
    
      {access?<Main/>:issignup?<Signup/>:<Signin/>}
  
    </div>)
}
export default App;