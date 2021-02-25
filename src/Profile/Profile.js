import { useDispatch, useSelector} from "react-redux";
import Top from './Top/Top'
import getfollowing from '../methods/getfollowing.js'
import getpostcount from '../methods/getpostcount'
import getfollowers from '../methods/getfollowers'
import Userposts from '../posts/Userposts'
import Container from './Container/Container'
import Showbar from '../showbar/Showbar'
import { useEffect, useState } from "react";

const Profile = () => {
  const dispatch=useDispatch();
 const [post,setpost]=useState(false);
 const posts=useSelector(state=>state.userposts);
 const {username}=useSelector(state=>state.user);
 const {postcount}=useSelector(state=>state.count);
 const [showfollowers,setshowfollowers]=useState(false);
 const [showfollowing,setshowfollowing]=useState(false);
const setposthand=()=>{
  setpost(!post);
}
useEffect(()=>{
getfollowing(username,dispatch);
getpostcount(username,dispatch);
getfollowers(username,dispatch);
},[username])
const setshowfollowershandle=(val)=>{
  setshowfollowers(val)
}
const setshowfollowinghandle=(value)=>{
  setshowfollowing(value)
}
    
if(showfollowers)
{
    return (
        <Showbar setshowfollowershandle={setshowfollowershandle} setshowfollowinghandle={setshowfollowinghandle} showfollowing={showfollowing} showfollowers={showfollowers}   username={username}       />

    )
}
else if(showfollowing)
{
  return (
    <Showbar setshowfollowershandle={setshowfollowershandle} setshowfollowinghandle={setshowfollowinghandle} showfollowing={showfollowing} showfollowers={showfollowers}   username={username}       />

)
}else{

  return (
    <div>
      <Top   setshowfollowershandle={setshowfollowershandle} setshowfollowinghandle={setshowfollowinghandle}  setposthand={setposthand}   />
      {post?null:<><Container posts={posts} /> <Userposts   /> </>}
   
    </div>
  );
};



}



export default Profile;
