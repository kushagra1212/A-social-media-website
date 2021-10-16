
import { useState } from 'react';

import { useSelector } from 'react-redux';
import Styles from './Topprofile.module.css'
import { useAlert } from 'react-alert';
const Topprofile=({setposthandle,edit_it,logouthandle,name,img,username,bio,postsnumber,setshowfollowershandle,setshowfollowinghandle})=>{
    const Alert=useAlert();
    const [showAlert,setShowAlert]=useState(true);
    const {followerscount,followingcount}=useSelector(state=>state.count);
    let {
        profilepic,
      } = useSelector((state) => {
       
        return state.user;
      });
    const showAlertHandle=()=>{
      
        Alert.info("Not Available 😛",{
            onOpen:()=>{
                 setShowAlert(false);
            },
            
            onClose:()=>{
            setShowAlert(true);
        }
    
    });
       
      }
    return(
        <div className={Styles.maindiv}  >
        <div className={Styles.firstdiv} >
        <img src={profilepic?profilepic:process.env.PUBLIC_URL+'/userImage.png'} alt=""  />
        <button onClick={()=>edit_it()} className={Styles.editbut}>Edit Profile</button>
        <button className={Styles.logoutbut} onClick={logouthandle}>Log out</button>

        </div>
        <div className={Styles.seconddiv}  >
        <h3>{name}</h3>
        <img src={img} alt="" />
        <h6>@{username}</h6>
        <h5>{bio}</h5>
        
        </div>
        <div  className={Styles.thirddiv} >
            <div  className={Styles.posts}  >
            <label style={{color:"white"}} >Posts</label><br/>
            {postsnumber}

            </div>

<label> <button  className={Styles.followersbut} onClick={()=>followerscount>=1?setshowfollowershandle(true):showAlert? showAlertHandle():null}      >followers </button> <h6>{followerscount}</h6>  </label>

<label> <button className={Styles.followingbut}   onClick={()=>followingcount?setshowfollowinghandle(true): showAlert? showAlertHandle():null}      >following </button> <h6>{followingcount}</h6></label>

<button className={Styles.addapost} onClick={setposthandle}   >Add a Post </button>
        </div>

    </div>
    )
}
export default Topprofile;