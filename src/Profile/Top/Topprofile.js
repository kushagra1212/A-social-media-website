
import { useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useSelector } from 'react-redux';
import Styles from './Top.module.css'
const Topprofile=({setposthandle,edit_it,profpic,logouthandle,name,img,username,bio,postsnumber,setshowfollowershandle,setshowfollowinghandle})=>{
    const {followerscount,followingcount}=useSelector(state=>state.count);
   console.log("from topprof",followerscount)
    return(
        <div className={Styles.maindiv}  >
        <div className={Styles.firstdiv} >
        <img src={profpic}  />
        <button onClick={edit_it} className={Styles.editbut}>Edit Profile</button>
        <button onClick={logouthandle}>Log out</button>

        </div>
        <div className={Styles.seconddiv}  >
        <h3>{name}</h3>
        <img src={img}/>
        <h6>@{username}</h6>
        <h5>{bio}</h5>
        
        </div>
        <div  className={Styles.thirddiv} >
<label>Posts <h6> {postsnumber}</h6></label>

<label> <button   onClick={()=>setshowfollowershandle(true)}      >followers </button> <h6>{followerscount}</h6>  </label>

<label> <button   onClick={()=>setshowfollowinghandle(true)}      >following </button> <h6>{followingcount}</h6></label>

<button onClick={setposthandle}   >Add a Post </button>
        </div>

    </div>
    )
}
export default Topprofile;